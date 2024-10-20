import {
  alldown,
  tikdown,
  ndown,
  ytdown,
  twitterdown,
  pintarest,
} from "nayan-media-downloader";
import { logger } from "./logger";

export const downloader = async (url) => {
  const data = await alldown(url);
  logger.info("[url data] ", data);
  return data;
};

const tiktok = async (url) => {
  const data = await tikdown(url);
  logger.info("[tiktok url data] ", data);
  return data;
};

const facebook = async (url) => {
  let data = await ndown(url);
  logger.info("[facebook url data] ", data);
  return data;
};

const instagram = async (url) => {
  let data = await ndown(url);
  logger.info("[instagram url data] ", data);
  return data;
};

const youtube = async (url) => {
  let data = await ytdown(url);
  logger.info("[youtube url data] ", data);
  return data;
};

const twitter = async (url) => {
  let data = await twitterdown(url);
  logger.info("[twitter url data] ", data);
  return data;
};
