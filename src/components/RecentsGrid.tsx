// import { Card, CardContent, CardDescription, CardTitle } from 'keep-react'
// import ReactPlayer from 'react-player'
import { Card, CardContent, CardDescription, CardTitle } from 'keep-react'
import ReactPlayer from 'react-player'
import { $store } from '../store'
import Box from './Box'
import React from 'react'
import styled from 'styled-components'

export const RecentsGrid = () => {
  const state = $store.use()

  return (
    <Box width="100%" xAlign="center" style={{ overflowY: 'scroll', width: '100%', height: '87%', padding: '24px' }}>
      <Box gap="12px" width="100%" padding="24px" shouldWrap>
        <VideoGallery />
      </Box>
    </Box>
  )
}

const VideoContainer = styled.div`
  width: 100%;
  height: 87%;
  overflow-y: auto;
  padding-bottom: 48px;
`

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 12px;
  padding: 24px;
  justify-content: center;
`

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  border: 1px solid #333333;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`

const VideoPlayer = ({ url }) => (
  <VideoWrapper>
    <ReactPlayer url={url} controls width="100%" height="100%" style={{ maxWidth: '100%', maxHeight: '100%' }} />
  </VideoWrapper>
)

export const VideoGallery = () => {
  const state = $store.use()
  return (
    <VideoContainer>
      <VideoGrid>
        {state.assetUrlHistory.map((url, index) => (
          <VideoPlayer key={index} url={url} />
        ))}
      </VideoGrid>
    </VideoContainer>
  )
}
