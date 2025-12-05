// Configuration file
export const API_URL = import.meta.env.VITE_API_URL 
export const TELEGRAM_GROUP = import.meta.env.VITE_TELEGRAM_GROUP 
export const PLATFORM_URL = import.meta.env.VITE_PLATFORM_URL

// You can also export a config object
export const config = {
  apiUrl: API_URL,
  telegramGroup: TELEGRAM_GROUP,
  platformUrl: PLATFORM_URL,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};