"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFavoriteCryptos } from "@/lib/redux/slices/cryptoSlice"

export function useHydrateCryptoFavorites() {
    const dispatch = useDispatch()

    useEffect(() => {
        const stored = localStorage.getItem("cryptoFavorites")
        if (stored) {
            try {
                dispatch(setFavoriteCryptos(JSON.parse(stored)))
            } catch (err) {
                console.error("Failed to parse cryptoFavorites", err)
            }
        }
    }, [dispatch])
}
