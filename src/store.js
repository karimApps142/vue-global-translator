import { defineStore } from 'pinia'
import { configureApiClient, fetchSyncVersions, fetchTranslations, fetchCurrencies } from './api'

const rtlLanguages = ['ar', 'ur', 'he', 'fa', 'yi']

export const useLocalizationStore = defineStore('localization', {
  state: () => ({
    status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
    translations: {},
    currencies: {},
    currentLang: 'en',
    isRTL: false,
    translationVersion: 0,
    currencyVersion: 0,
    shouldFetchCurrencies: false,
    apiUrl: null,
    apiKey: null
  }),

  actions: {
    init({ apiUrl, apiKey, defaultLanguage = 'en', fetchCurrencies: enableCurrencies = false }) {
      if (!apiUrl || !apiKey) {
        console.error('Localization Error: apiUrl and apiKey must be provided.')
        this.status = 'error'
        return
      }

      this.apiUrl = apiUrl
      this.apiKey = apiKey
      configureApiClient(apiUrl, apiKey)

      this.shouldFetchCurrencies = enableCurrencies
      if (!this.currentLang) this.currentLang = defaultLanguage

      // After init, trigger initial fetch
      this.fetchAndSync()
    },

    async fetchAndSync() {
      if (!this.apiUrl || !this.apiKey) {
        console.error('Localization Error: API not configured.')
        return
      }

      this.status = 'loading'

      try {
        const { data: serverVersions } = await fetchSyncVersions()

        const needsTranslationsFetch = serverVersions.translation_version > this.translationVersion

        if (needsTranslationsFetch) {
          const { data: newTranslations } = await fetchTranslations(this.currentLang)

          let newCurrencies = this.currencies
          if (this.shouldFetchCurrencies) {
            const { data } = await fetchCurrencies()
            newCurrencies = data
          }

          this.translations = newTranslations
          this.currencies = newCurrencies
          this.translationVersion = serverVersions.translation_version
          this.currencyVersion = serverVersions.currency_version
          this.status = 'ready'

          // Persist to localStorage
          this.persist()
        } else {
          this.status = 'ready'
        }
      } catch (error) {
        console.error(`Failed to sync localization for '${this.currentLang}':`, error)
        this.status = 'error'
      }
    },

    setLanguage(langCode) {
      if (this.currentLang === langCode || this.status === 'loading') return

      this.isRTL = rtlLanguages.includes(langCode)
      this.currentLang = langCode
      this.translations = {}
      this.translationVersion = 0
      this.status = 'loading'

      this.persist()
      this.fetchAndSync()
    },

    persist() {
      const data = {
        translations: this.translations,
        currencies: this.currencies,
        currentLang: this.currentLang,
        isRTL: this.isRTL,
        translationVersion: this.translationVersion,
        currencyVersion: this.currencyVersion
      }
      localStorage.setItem('localization-store', JSON.stringify(data))
    },

    rehydrate() {
      const saved = localStorage.getItem('localization-store')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          Object.assign(this, parsed)
        } catch (err) {
          console.error('Failed to rehydrate localization store:', err)
        }
      }
    }
  }
})
