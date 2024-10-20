const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));
const ffprobe = promisify(require('ffprobe'));
const ffprobeStatic = require('ffprobe-static');

const router = express.Router();

async function analyzeFile(filePath, fileExtensions) {
  const stats = await fs.stat(filePath);
  const extension = path.extname(filePath).toLowerCase().slice(1);
  
  if (!fileExtensions.includes(extension)) {
    return null;
  }

  const baseInfo = {
    size: stats.size,
    creationDate: stats.birthtime,
    modifiedDate: stats.mtime,
    type: 'file',
    extension,
    name: path.basename(filePath),
  };

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    try {
      const dimensions = await sizeOf(filePath);
      return { ...baseInfo, type: 'image', width: dimensions.width, height: dimensions.height };
    } catch (error) {
      console.error(`Error analyzing image: ${filePath}`, error);
      return baseInfo;
    }
  }

  if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
    try {
      const info = await ffprobe(filePath, { path: ffprobeStatic.path });
      const videoStream = info.streams.find(stream => stream.codec_type === 'video');
      return {
        ...baseInfo,
        type: 'video',
        width: videoStream.width,
        height: videoStream.height,
        duration: parseFloat(info.format.duration),
      };
    } catch (error) {
      console.error(`Error analyzing video: ${filePath}`, error);
      return baseInfo;
    }
  }

  if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) {
    try {
      const info = await ffprobe(filePath, { path: ffprobeStatic.path });
      const audioStream = info.streams.find(stream => stream.codec_type === 'audio');
      return {
        ...baseInfo,
        type: 'audio',
        duration: parseFloat(info.format.duration),
        bitrate: parseInt(audioStream.bit_rate),
        sampleRate: parseInt(audioStream.sample_rate),
      };
    } catch (error) {
      console.error(`Error analyzing audio: ${filePath}`, error);
      return baseInfo;
    }
  }

  // For other file types, you can add more specific analysis here
  return baseInfo;
}

async function analyzeDirectory(directoryPath, shouldRecurse, fileExtensions) {
  const results = [];
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    
    if (entry.isFile()) {
      const fileInfo = await analyzeFile(fullPath, fileExtensions);
      if (fileInfo) {
        results.push(fileInfo);
      }
    } else if (entry.isDirectory() && shouldRecurse) {
      const subDirResults = await analyzeDirectory(fullPath, shouldRecurse, fileExtensions);
      results.push(...subDirResults);
    }
  }

  return results;
}

router.post('/getDirectoryAnalysis', async (req, res) => {
  try {
    const { directoryPath, shouldRecurse, fileExtensions } = req.body;

    if (!directoryPath || typeof shouldRecurse !== 'boolean' || !Array.isArray(fileExtensions)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const analysisResults = await analyzeDirectory(directoryPath, shouldRecurse, fileExtensions);
    res.json(analysisResults);
  } catch (error) {
    console.error('Error in getDirectoryAnalysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;