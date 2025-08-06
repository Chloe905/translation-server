import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text,
        source_lang: sourceLang,
        target_lang: targetLang
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Proxy Error:', err.message);
    res.status(500).json({ error: 'Translation failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
