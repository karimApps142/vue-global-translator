import axios from 'axios'

let apiClient = axios.create({
  headers: {
    'Accept': 'application/json'
  }
})

export const configureApiClient = (apiUrl, apiKey) => {
  apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
      'Accept': 'application/json',
      'X-API-KEY': apiKey
    }
  })
}

export const fetchSyncVersions = () => apiClient.get('/sync')
export const fetchCurrencies = () => apiClient.get('/currencies')
export const fetchTranslations = (langCode) => apiClient.get(`/translations?lang=${langCode}`)
