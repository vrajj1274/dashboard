"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFavoriteCities } from "@/lib/redux/slices/weatherSlice" // ✅ Clean path, no .ts at end

export default function WeatherClientSync() {
    const dispatch = useDispatch()

    useEffect(() => {
        const stored = localStorage.getItem("weatherFavorites")
        if (stored) {
            dispatch(setFavoriteCities(JSON.parse(stored)))
        }
    }, [dispatch])

    return null
}
