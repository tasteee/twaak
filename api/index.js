// tikdown, ndown, ytdown, twitterdown, pintarest
import downloader from 'nayan-media-downloader'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { logger } from './logger'
import checkIsUrlValid from 'is-url-superb'
import checkIsUrlReachable from 'is-reachable'
import s from 'videos-downloader'
import { determineDownloadPlatform } from './getTwitterUrl.cjs'

export const downloader = async (url) => {
  const data = await downloader.twitterdown(url)
  logger.info('[downloader data] ', data)
  return data
}

const isUrlAcceptable = async (url) => {
  logger.info('[isUrlAcceptable validating url] ', url)
  const isUrlValid = checkIsUrlValid(url)
  const isUrlReachable = await checkIsUrlReachable(url)
  const shouldContinue = isUrlValid && isUrlReachable
  const result = { isUrlValid, isUrlReachable, shouldContinue }
  logger.info('[isUrlAcceptable] ', result)
  return result
}

const send400 = (response, data) => {
  logger.error('[send400] ', data)
  response.status(400).json(data)
}

const send200 = (response, result) => {
  logger.info('[send200 tweetId] ', result.tweetId)
  response.status(200).json(result)
}

const handleGetAssetDataFromUrl = async (request, response) => {
  const urlStatus = await isUrlAcceptable(request.body.url)
  if (!urlStatus.shouldContinue) return send400(response, urlStatus)
  const platform = determineDownloadPlatform(request.body.url)
  if (!platform) return send400(response, { invalidUrl: true })
  const { result } = await s[platform](request.body.url)
  send200(response, result)
}

const createApp = () => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.post('/api/getAssetDataFromUrl', handleGetAssetDataFromUrl)
  return app
}

const app = createApp()
export const handler = app
