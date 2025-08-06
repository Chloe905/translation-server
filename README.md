# DeepL Translation Server

這是一個使用 Node.js + Express 建立的 Translation Server，讓前端應用程式可以安全地透過後端轉發 DeepL API 請求，解決 CORS 限制問題。

## 📦 功能

- 使用 Express 接收翻譯請求
- 使用 Axios 呼叫 DeepL API
- 使用 `.env` 存放私密 API 金鑰
- 解決瀏覽器前端無法直接呼叫 DeepL 的 CORS 問題

---

## 🚀 快速開始

### 1. Clone 專案
``bash
git clone https://github.com/你的帳號/tanslation-server.git
cd tanslation-server
``
### 2. npm install

### 3. 建立 .env 檔案，填入你的 DeepL API 金鑰
`` env
DEEPL_API_KEY=你的_deepl_api_key
``
你可以從這裡取得金鑰：https://www.deepl.com/account/summary

### 4. 啟動伺服器
``bash
npm start
``
### 5. 伺服器將會運行在：
`http://localhost:3001`
