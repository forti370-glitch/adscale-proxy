const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/generate-image', async (req, res) => {
  try {
    const { apiKey, prompt } = req.body;
    if(!apiKey) return res.status(400).json({ error: { message: "No API key provided" } });
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model: 'gpt-image-1', prompt, n: 1, size: '1024x1024', quality: 'high' })
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('AdScale OS proxy running'));

