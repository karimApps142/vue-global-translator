import { useLocalizationStore } from './store'

/**
 * Initializes the localization service. Must be called once at app startup.
 * @param {object} config - The configuration object.
 * @param {string} config.apiUrl - The base URL for the API.
 * @param {string} config.apiKey - The plain-text API key.
 * @param {string} [config.defaultLanguage='en'] - The fallback language.
 * @param {boolean} [config.fetchCurrencies=false] - Enable currency fetching.
 */
export const initLocalization = (config) => {
  const store = useLocalizationStore()
  store.init(config)
}

/**
 * Hook-like function to access localization state and functions.
 * @returns {object}
 */
export const useLocalization = () => {
  const store = useLocalizationStore()

  const t = (key) => store.translations[key] || key

  return {
    t,
    currencies: store.currencies,
    currentLang: store.currentLang,
    isRTL: store.isRTL,
    status: store.status,
    setLanguage: store.setLanguage
  }
}
