import { $store } from '../store'
import { Input } from 'keep-react'
import Box from './Box'
import { Button } from 'keep-react'

export const UrlLoader = () => {
  const state = $store.use()

  const handleSubmit = (event) => {
    event.preventDefault()
    $store.getAssetDataFromUrl(state.inputUrl)
  }

  return (
    <Box gap="12px" width="600px" marginCentered xAlign="center" padding="24px">
      <Input value={state.inputUrl} onChange={$store.setInputUrl} placeholder="paste the url here" />
      <Button color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  )
}
