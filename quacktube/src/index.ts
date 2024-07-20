import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  // Get the path of the input viedo file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  // Handle request body errors
  if (!inputFilePath || !outputFilePath) {
    res.status(400).send('Bad Request: Missing file path.');
  }

  ffmpeg(inputFilePath)
    .outputOptions('-vf', "scale='trunc(oh*a/2)*2:360'")
    .on('end', function () {
      console.log('Processing finished successfully');
      return res.status(200).send('Processing finished successfully');
    })
    .on('error', function (err: any) {
      console.log('An error occurred: ' + err.message);
      return res.status(500).send('An error occurred: ' + err.message);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
