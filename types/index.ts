// Weather Types
export interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  timestamp: string
}

export interface WeatherHistoryData {
  timestamp: string | number
  temperature: number
  condition: string
  humidity: number
}


// Crypto Types
export interface CryptoData {
  id: string
  name: string
  symbol: string
  currentPrice: number
  marketCap: number
  totalVolume: number
  priceChangePercentage24h: number
  circulatingSupply: number
  ath: number
  lastUpdated: string
}

export interface CryptoHistoryData {
  price: number
  volume: number
  marketCap: number
  timestamp: string
}

// News Types
export interface NewsArticle {
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
}
export interface NewsApiResponseItem {
  title: string
  description: string
  link: string
  source_id: string
  pubDate: string
}
// Notification Types
export interface Notification {
  type: "price_alert" | "weather_alert"
  title: string
  message: string
  timestamp: string
}
