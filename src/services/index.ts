import wretch from 'wretch'
import { $store } from '../store'

const FAILED_TO_LOAD_ERROR = { didError: true, errorMessage: 'Failed to load.' }

export const getAssetDataFromUrl = async (url: string) => {
  const handleSuccess = (response: any) => {
    const assetUrl = response?.mediaURLs?.[0]
    console.log('GOT RESPONSE:', assetUrl)
    if (!assetUrl) return $store.set(FAILED_TO_LOAD_ERROR)
    $store.set({ assetUrl, assetData: response })
    $store.addAssetUrlToHistory(assetUrl)
  }

  const handleError = (error: any) => {
    console.error('GOT ERROR:', error)
  }

  return wretch('/api/getAssetDataFromUrl').post({ url }).json(handleSuccess).catch(handleError)
}
