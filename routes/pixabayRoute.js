const https = require('https');
const express = require('express');
const router = express.Router();

const apiKey = '38025714-8dab2bc0a63c5f98c1f2b7f87';

router.get('/', async (req, res) => {
  const { q, page } = req.query;

  const queryParams = new URLSearchParams({
    key: apiKey,
    q,
    lang: 'en',
    image_type: 'photo',
    orientation: 'all',
    category: 'nature',
    min_width: 100,
    min_height: 100,
    editors_choice: false,
    safesearch: true,
    order: 'popular',
    page,
    per_page: 20,
  });

  const apiUrl = `https://pixabay.com/api/?${queryParams}`;

  https.get(apiUrl, httpResponse => {
    const { statusCode } = httpResponse;

    if (statusCode !== 200) {
      console.error(`HTTP error! Status: ${statusCode}`);
      httpResponse.resume();
      return res.status(500).json({ message: 'Error fetching data from Pixabay' });
    }

    let rawJsonData = '';
    httpResponse.setEncoding('utf8');
    httpResponse.on('data', chunk => rawJsonData += chunk);
    httpResponse.on('end', () => {
      try {
        console.log(rawJsonData);
        const parsedJsonData = JSON.parse(rawJsonData);
        console.log(parsedJsonData);
        res.json(parsedJsonData);
      } catch (err) {
        res.status(500).json({ errMessage: err.message, errStack: err.stack });
      }
    });      
  }).on('error', err => {
    res.status(500).json({ errMessage: err.message });
  });
});

module.exports = router;
