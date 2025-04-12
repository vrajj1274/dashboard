import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { NewsArticle } from "@/types"

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY

// Define a type for the response item to avoid `any` type
interface NewsApiItem {
  title: string
  description: string
  link: string
  source_id: string
  pubDate: string
  error: string | null // Add error property to the state
}

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

      // Explicitly type the items as `NewsApiItem` to avoid `any`
      const articles: NewsArticle[] = json.results.map((item: NewsApiItem) => ({
        title: item.title,
        description: item.description,
        url: item.link,
        source: item.source_id,
        publishedAt: item.pubDate,
      }))

      return articles
    } catch (err) {
      // Changed 'error' to 'err' and used it in the error message
      return rejectWithValue(`Failed to fetch news data: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }
)

interface NewsState {
  articles: NewsArticle[]; // or whatever structure your articles follow
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // depending on your status management
  error: string | null; // error can be null initially or a string
}


const initialState: NewsState = {
  articles: [],
  status: 'idle', // or any other state you have
  error: null, // ensure error is initialized here, with a default of null or string
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },

})

export default newsSlice.reducer