const { Pool } = require("pg");

const pool = new Pool({
  user: "twitter",
  host: "localhost",
  database: "twitterdb",
  password: "password",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

module.exports = pool;
