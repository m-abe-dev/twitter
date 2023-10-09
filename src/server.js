const express = require('express');
const app = express();
const PORT = 3050;

app.get('/', (req, res) => {
  res.send('Hello, Twitter Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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
        message: error.message
      }
    });
  });
