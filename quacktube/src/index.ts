import express from 'express';
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setupDirectories,
  uploadProcessedVideo,
} from './storage';

require('dotenv').config();

setupDirectories();

const app = express();
app.use(express.json());

app.post('/process-video', async (req, res) => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received.');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad request: missing filename.');
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  // Convert the video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)]);
    console.log(err);
    return res.status(500).send('Internal Server Error: video processing failed.');
  }

  // Upload the processed video the Cloud Storage
  await uploadProcessedVideo(outputFileName);
  await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)]);

  return res.status(200).send('Process finished successfully.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
