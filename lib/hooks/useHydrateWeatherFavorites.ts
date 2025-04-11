"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFavoriteCities } from "@/lib/redux/slices/weatherSlice"

export function useHydrateWeatherFavorites() {
    const dispatch = useDispatch()

    useEffect(() => {
        const stored = localStorage.getItem("weatherFavorites")
        if (stored) {
            try {
                dispatch(setFavoriteCities(JSON.parse(stored)))
            } catch (err) {
                console.error("Failed to parse weatherFavorites", err)
            }
        }
    }, [dispatch])
}
