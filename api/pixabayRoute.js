const axios = require("axios");

module.exports = async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.PIXABAY_API_KEY;

  try {
    const { data } = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q,
        lang: "en",
        image_type: "photo",
        orientation: "all",
        category: "nature",
        min_width: 100,
        min_height: 100,
        editors_choice: false,
        safesearch: true,
        order: "popular",
        page: 1,
        per_page: 20,
      },
    });

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Send the response
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Pixabay:", error);

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Send the error response
    res.status(500).json({ message: "Error fetching data from Pixabay" });
  }
};