// store/store.ts
import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./slices/weatherSlice"
import cryptoReducer from "./slices/cryptoSlice"
import notificationsReducer from "./slices/notificationsSlice"
import newsReducer from "./slices/newsSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    notifications: notificationsReducer,
    news: newsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
