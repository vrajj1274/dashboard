"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { clearNotifications } from "@/lib/redux/slices/notificationsSlice"

export function useNotifications() {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications.notifications)

  return {
    notifications,
    clearNotifications: () => dispatch(clearNotifications()),
  }
}
