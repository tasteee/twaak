import { datass } from './datass'
import { getAssetDataFromUrl } from '../services'

const assetUrlHistoryString = localStorage.getItem('assetUrlHistory') || '[]'
const assetUrlHistory = JSON.parse(assetUrlHistoryString)

const store = datass.object({
  inputUrl: '',
  assetData: null,
  assetUrl: '',
  isLoading: false,
  didError: false,
  errorMessage: '',
  assetUrlHistory,
})

const setInputUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
  store.set({ inputUrl: event.target.value })
}

const addAssetUrlToHistory = (assetUrl: string) => {
  const assetUrlHistory = store.state.assetUrlHistory
  const historyLength = assetUrlHistory.length
  const newHistory = historyLength >= 99 ? assetUrlHistory.slice(1) : assetUrlHistory
  newHistory.unshift(assetUrl)
  store.set({ assetUrlHistory: newHistory })
  const stringified = JSON.stringify(newHistory)
  localStorage.setItem('assetUrlHistory', stringified)
}

export const $store = {
  use: store.use,
  set: store.set,
  getAssetDataFromUrl,
  addAssetUrlToHistory,
  setInputUrl,
}
