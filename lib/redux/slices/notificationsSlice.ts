import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Notification } from "@/types"

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: [],
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      // Limit to 10 notifications
      if (state.notifications.length > 10) {
        state.notifications.pop()
      }
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { addNotification, clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer
