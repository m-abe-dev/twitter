const express = require('express');
const tweetsRoutes = require('./routes/tweets');
const db = require('./dbConfig');

const app = express();
const PORT = 3050;

app.get('/', (req, res) => {
  res.send('Hello, Twitter Backend!');
});

// ツイート関連のルートを登録
app.use('/tweets', tweetsRoutes);

// 404エラーハンドリング
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// エラーハンドリングミドルウェア: エラーをキャッチしてクライアントにJSON形式でエラーメッセージを返す。
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
