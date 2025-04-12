# 🌐 CryptoWeather Nexus

A modern, real-time dashboard combining **weather data**, **cryptocurrency insights**, and **live notifications** — built with Next.js, Redux, Tailwind CSS, and WebSocket support.

> ✅ **Live Demo:**(https://dashboard-663r.vercel.app/)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 13+
- **Language:** TypeScript
- **UI:** React, Tailwind CSS
- **State Management:** Redux Toolkit + Redux Persist
- **API Integrations:**
  - Weather: [OpenWeatherMap](https://openweathermap.org/api)
  - Crypto: [CoinGecko API](https://www.coingecko.com/en/api)
  - News: [NewsData.io](https://newsdata.io/)
- **WebSocket:** CoinCap WebSocket for real-time crypto pricing
- **Hosting:** Deployed on Vercel

---

## 🚀 Features

- 🌤️ **Weather Section**
  - Temperature, humidity, and conditions for **New York**, **London**, and **Tokyo**
  - Detail pages with historical weather (static chart)

- 💰 **Crypto Section**
  - Live prices for **Bitcoin**, **Ethereum**, and **Dogecoin**
  - Price, 24h change, and market cap
  - Detail pages with historical price data (chart)

- 📰 **News Section**
  - Top 5 crypto-related headlines from NewsData.io

- 🔔 **Real-Time Notifications**
  - CoinCap WebSocket stream for BTC/ETH
  - Simulated weather alerts
  - Toast-style alerts with type indicators (`price_alert`, `weather_alert`)

- ⭐ **Favorites**
  - Users can favorite cities and cryptos
  - Persisted with Redux + localStorage
  - Displayed prominently in dashboard

- 💻 **Responsive & Accessible**
  - Seamlessly adapts from mobile to desktop
  - Clear hover/focus/active states
  - Light/Dark mode support

---
