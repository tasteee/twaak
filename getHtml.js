// import puppeteer from 'puppeteer'

// const url = 'https://x.com/AngryTomtweets/status/1818827854202728453';

// (async () => {
//   // Launch browser
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  
//   // Navigate to the URL
//   await page.goto(url, {
//     waitUntil: 'networkidle2',
//   });

//   // Select the first video element on the page.
//   const sourceElement = await page.$('video source');
//   const srcValue = await sourceElement.getProperty('src');

//   // srcValue:
//   // blob:https://x.com/9fcd3754-725a-439d-8455-67e63c44fd30

//   // Use the blob url to load the video and encode it to base64.

//   // Close the browser
//   await browser.close();
// })();


import puppeteer from 'puppeteer';
import wait from 'wait'

const url = 'https://x.com/AngryTomtweets/status/1818827854202728453';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Intercept network requests
  await page.setRequestInterception(true);
  
  page.on('request', request => {
    // Continue all requests as normal
    request.continue();
  });

  let videoUrl = null;
  page.on('response', async response => {
    const request = response.request();
    if (request.resourceType() === 'media') {
      // We found a media request, which might be the video
      videoUrl = request.url();
      console.log('Video URL:', videoUrl);
    }
  });

  page.on('response', async (response) => {
    console.log('Response:', response.url(), response.request().resourceType());
  });

  // Navigate to the URL
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  // Give some time for video requests to be captured
  await wait(5000); // Wait for 5 seconds

  // Close the browser
  await browser.close();

  if (videoUrl) {
    console.log(`Extracted Video URL: ${videoUrl}`);
  } else {
    console.log('Video URL not found.');
  }
})();
