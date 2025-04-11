import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { CryptoData, CryptoHistoryData } from "@/types"
import { addNotification } from "./notificationsSlice"
import type { AppDispatch } from "../store"

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"
const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY

if (!COINGECKO_API_KEY) {
  throw new Error("Missing CoinGecko API Key")
}

interface CoinGeckoMarketData {
  id: string
  name: string
  symbol: string
  current_price: number
  market_cap: number
  total_volume: number
  price_change_percentage_24h: number
  circulating_supply: number
  ath: number
  last_updated: string
}

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana`,
        {
          headers: {
            "x-cg-demo-api-key": COINGECKO_API_KEY,
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("CoinGecko API error:", response.status, errorText)
        throw new Error("Failed to fetch crypto data")
      }

      const json: CoinGeckoMarketData[] = await response.json()

      const data: Record<string, CryptoData> = {}

      json.forEach((item) => {
        data[item.id] = {
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          currentPrice: item.current_price,
          marketCap: item.market_cap,
          totalVolume: item.total_volume,
          priceChangePercentage24h: item.price_change_percentage_24h,
          circulatingSupply: item.circulating_supply,
          ath: item.ath,
          lastUpdated: item.last_updated,
        }
      })

      return data
    } catch (error: unknown) {
      const err = error as Error
      console.error("Error fetching crypto data:", err.message)
      return rejectWithValue("Failed to fetch cryptocurrency data. Please try again later.")
    }
  }
)

export const fetchCryptoHistory = createAsyncThunk(
  "crypto/fetchCryptoHistory",
  async (id: string, { rejectWithValue }) => {
    try {
      const history: CryptoHistoryData[] = Array(7)
        .fill(0)
        .map((_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const price = Math.random() * 1000 + 100

          return {
            price,
            volume: price * 1000 + Math.random() * 100000,
            marketCap: price * 1000000 + Math.random() * 10000000,
            timestamp: date.toISOString(),
          }
        })

      return { id, history }
    } catch {
      return rejectWithValue("Failed to fetch cryptocurrency history. Please try again later.")
    }
  }
)

export const startWebSocket = () => (dispatch: AppDispatch) => {
  const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana")

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    Object.keys(data).forEach((crypto) => {
      const change = Math.random() * 6 - 3
      if (Math.abs(change) > 2) {
        dispatch(
          addNotification({
            type: "price_alert",
            title: `${crypto.charAt(0).toUpperCase() + crypto.slice(1)} Price Alert`,
            message: `${change > 0 ? "Increased" : "Decreased"} by ${Math.abs(change).toFixed(2)}% in the last minute`,
            timestamp: new Date().toISOString(),
          })
        )
      }
    })
  }


  return () => ws.close()
}

interface CryptoState {
  cryptos: string[]
  favorites: string[]
  data: Record<string, CryptoData>
  history: Record<string, CryptoHistoryData[]>
  status: "idle" | "loading" | "succeeded" | "failed"
  historyStatus: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CryptoState = {
  cryptos: ["bitcoin", "ethereum", "solana"],
  favorites: [],
  data: {},
  history: {},
  status: "idle",
  historyStatus: "idle",
  error: null,
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const crypto = action.payload
      if (state.favorites.includes(crypto)) {
        state.favorites = state.favorites.filter((c) => c !== crypto)
      } else {
        state.favorites.push(crypto)
      }
    },
    setFavoriteCryptos: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      .addCase(fetchCryptoHistory.pending, (state) => {
        state.historyStatus = "loading"
      })
      .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
        const { id, history } = action.payload
        state.history[id] = history
        state.historyStatus = "succeeded"
      })
      .addCase(fetchCryptoHistory.rejected, (state) => {
        state.historyStatus = "failed"
      })
  },
})

export const { toggleFavoriteCrypto, setFavoriteCryptos } = cryptoSlice.actions
export default cryptoSlice.reducer
