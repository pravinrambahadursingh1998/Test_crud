const bookshelf = require("../config/db");

module.exports = bookshelf.model("User", {
  tableName: "users",
});
