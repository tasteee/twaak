export const getVideoUrls = async (options) => {
  const response = await fetch(
    `/api/getTwitterHtml/${options.userName}/${options.tweetId}`
  );

  const videoUrls = await response.json();
  return videoUrls;
};
