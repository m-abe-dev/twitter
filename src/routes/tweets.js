const express = require("express");
const pool = require("../db"); // db.js からのデータベース接続をインポート
const router = express.Router();

// 全てのツイートを取得
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM tweets ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ツイートの投稿
router.post("/", async (req, res) => {
  const { content } = req.body; // リクエストボディからツイートの内容を取得

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO public.tweets (content) VALUES ($1) RETURNING *",
      [content]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 特定のツイートを取得
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.tweets WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ツイートを更新
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE public.tweets SET content = $1 WHERE id = $2 RETURNING *",
      [content, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ツイートを削除
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM public.tweets WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }
    res.json({ message: "Tweet deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
