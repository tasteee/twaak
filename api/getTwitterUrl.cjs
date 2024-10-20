import downloader from 'nayan-media-downloader' // v2.4.5 working

const USERNAME_REGEX = /([a-zA-Z0-9_]+)/
const TWITTER_URL_REGEX = /https:\/\/x\.com\//
const INSTAGRAM_URL_REGEX = /https:\/\/www\.instagram\.com\/p\//
const TIKTOK_URL_REGEX = /https:\/\/www\.tiktok\.com\/@/
const YOUTUBE_URL_REGEX = /https:\/\/www\.youtube\.com\/watch?v=/
const youtubeRegex = new RegExp(YOUTUBE_URL_REGEX.source + '([a-zA-Z0-9_-]+)')
const instagramRegex = new RegExp(INSTAGRAM_URL_REGEX.source + '([a-zA-Z0-9_-]+)')
const twitterRegex = new RegExp(TWITTER_URL_REGEX.source + USERNAME_REGEX.source + '/status/([0-9]+)')
const tiktokRegex = new RegExp(TIKTOK_URL_REGEX.source + USERNAME_REGEX.source + '/video/([0-9]+)')

export const determineDownloadPlatform = (url) => {
  if (twitterRegex.test(url)) return 'twitter'
  if (instagramRegex.test(url)) return 'instagram'
  // if (tiktokRegex.test(url)) return 'tiktok'
  // if (facebookRegex.test(url)) return 'facebook'
  if (youtubeRegex.test(url)) return 'youtube'
  return null
}

export const getTweetVideoUrls = async (options) => {
  const output = await downloader.twitterdown(`https://x.com/${options.userName}/status/${options.tweetId}`)

  return output.data
}
