import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { phrases } from './phrasesData.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const DeepL_API_KEY = process.env.DeepL_API_KEY;

// 確保語言代碼符合 DeepL API 的要求
const normalizeLangCode = (lang) => {
  if (lang.toLowerCase() === 'zh-tw' || lang.toLowerCase() === 'zh-cn') return 'ZH';
  return lang.toUpperCase();
};

app.get('/phrases', (req, res) => {
  let { lang } = req.query;
  lang = lang ? normalizeLangCode(lang).toLowerCase() : 'en';
  const result = phrases[lang] || {};
  res.json(result);
});

app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req?.body;

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      new URLSearchParams({
        auth_key: DeepL_API_KEY,
        text,
        source_lang: normalizeLangCode(sourceLang),
        target_lang: normalizeLangCode(targetLang)
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    if (err.response) {
      // DeepL API 有回應（例如 400、403、456...）
      console.error('DeepL API Error:', err.response.status, err.response.data);
      res.status(err.response.status).json(err.response.data);
    } else if (err.request) {
      // 請求有發出去但沒回應
      console.error('No response from DeepL API:', err.request);
      res.status(500).json({ error: 'No response from DeepL API' });
    } else {
      // axios 設定錯誤
      console.error('Axios error:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
