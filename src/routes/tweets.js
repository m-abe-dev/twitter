const express = require('express');
const router = express.Router();

// ツイートの取得
router.get('/', (req, res) => {
  // TODO: ツイートの取得処理
  res.json({ message: 'GET tweets' });
});

// ツイートの投稿
router.post('/', (req, res) => {
  // TODO: ツイートの投稿処理
  res.json({ message: 'POST tweet' });
});

module.exports = router;