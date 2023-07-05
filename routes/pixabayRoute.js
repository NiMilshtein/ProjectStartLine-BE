const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = '38025714-8dab2bc0a63c5f98c1f2b7f87';

router.get('/', async (req, res) => {
  const { q } = req.query;

  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
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
        page: 1,
        per_page: 20,
      },
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
    res.status(500).json({ message: 'Error fetching data from Pixabay' });
  }
});

module.exports = router;