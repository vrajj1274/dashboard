import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsArticle } from "@/types"

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY

export const fetchNewsData = createAsyncThunk(
  "news/fetchNewsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&language=en&category=business,technology`
      )

      if (!response.ok) throw new Error("Failed to fetch news")

      const json = await response.json()

      if (!json.results) throw new Error("No news articles found")

      const articles: NewsArticle[] = json.results.map((item: any) => ({
        title: item.title,
        description: item.description,
        url: item.link,
        source: item.source_id,
        publishedAt: item.pubDate,
      }))

      return articles
    } catch (error) {
      return rejectWithValue("Failed to fetch news data. Please try again later.")
    }
  }
)

interface NewsState {
  articles: NewsArticle[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: NewsState = {
  articles: [],
  status: "idle",
  error: null,
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.articles = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export default newsSlice.reducer
