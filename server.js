// server.js
const http2 = require('http2');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

app.get('/newss', async (req, res) => {
  const client = http2.connect('https://newsapi.org');
  const reqHeaders = {
    ':path': '/v2/everything?q=movies&from=2024-04-26&sortBy=publishedAt&apiKey=c3f7cb9c8e38424d85d2ee28a2631924',
    ':method': 'GET',
    'accept': 'application/json',
    'user-agent': 'BFR/0.1.0 (http2-client)' 
  };

  const request = client.request(reqHeaders);

  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    res.send(JSON.parse(data));
    client.close();
  });

  request.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
