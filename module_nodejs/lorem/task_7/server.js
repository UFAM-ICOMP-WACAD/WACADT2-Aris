const express = require('express');
const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/lorem/:paragraphs', async (req, res) => {
  const { paragraphs } = req.params;
  const loremIpsumText = await generateLoremIpsum(paragraphs);
  res.send(loremIpsumText);
});

async function generateLoremIpsum(paragraphs) {
  const loremIpsum = await fs.readFile(__dirname + '/lorem.txt', 'utf-8');
  const paragraphsArray = loremIpsum.split('\n\n');
  return paragraphsArray.slice(0, paragraphs).join('\n\n');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});