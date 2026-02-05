const knex = require("knex");
const bookshelfLib = require("bookshelf");
require("dotenv").config();

const knexConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  pool: { min: 0, max: 10 },
};

const knexInstance = knex(knexConfig);
// ---- CHECK DATABASE CONNECTION HERE ----
knexInstance
  .raw("SELECT 1")
  .then(() => {
    console.log("✅ MySQL Database Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ Failed to Connect to MySQL Database:");
    console.error(err);
  });

const bookshelf = bookshelfLib(knexInstance);

// Enable Bookshelf plugins
// bookshelf.plugin("registry");      // allows model relations by name
// bookshelf.plugin("pagination");    // optional

module.exports = bookshelf;
