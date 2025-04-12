import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { WeatherData, WeatherHistoryData } from "@/types"
import { addNotification } from "./notificationsSlice"

// Fetch current weather data
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string, { rejectWithValue, dispatch }) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      if (!response.ok) throw new Error("Failed to fetch weather data")
      const json = await response.json()

      const data: WeatherData = {
        temperature: json.main.temp,
        condition: json.weather[0].main,
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        timestamp: new Date().toISOString(),
      }

      // Optional simulated alert
      if (Math.random() < 0.1) {
        dispatch(
          addNotification({
            type: "weather_alert",
            title: `Weather Alert for ${city}`,
            message: `Severe weather conditions expected in ${city}. ${data.condition} with strong winds.`,
            timestamp: new Date().toISOString(),
          })
        )
      }

      return { city, data }
    } catch (err) {
      return rejectWithValue(`Failed to fetch weather data: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }
)

// Simulate weather history data
export const fetchWeatherHistory = createAsyncThunk(
  "weather/fetchWeatherHistory",
  async (city: string, { rejectWithValue }) => {
    try {
      const history: WeatherHistoryData[] = Array(7)
        .fill(0)
        .map((_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)

          return {
            temperature: Math.floor(Math.random() * 30) + 5,
            condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 50) + 30,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            timestamp: date.toISOString(),
          }
        })

      return { city, history }
    } catch (err) {
      return rejectWithValue(`Failed to fetch weather history: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }
)

interface WeatherState {
  cities: string[]
  favorites: string[]
  data: Record<string, WeatherData>
  history: Record<string, WeatherHistoryData[]>
  status: "idle" | "loading" | "succeeded" | "failed"
  historyStatus: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  historyError: string | null
}

const initialState: WeatherState = {
  cities: ["New York", "London", "Tokyo"],
  favorites: [],
  data: {},
  history: {},
  status: "idle",
  historyStatus: "idle",
  error: null,
  historyError: null,
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((c) => c !== city)
      } else {
        state.favorites.push(city)
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("weatherFavorites", JSON.stringify(state.favorites))
      }
    },
    setFavoriteCities: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Weather Data
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { city, data } = action.payload
        state.data[city] = data
        state.status = "succeeded"
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed"
        state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch weather data"
      })

      // Weather History
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.historyStatus = "loading"
        state.historyError = null
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        const { city, history } = action.payload
        state.history[city] = history
        state.historyStatus = "succeeded"
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.historyStatus = "failed"
        state.historyError = typeof action.payload === "string" ? action.payload : "Failed to fetch weather history"
      })
  },
})

export const { toggleFavoriteCity, setFavoriteCities } = weatherSlice.actions
export default weatherSlice.reducer
