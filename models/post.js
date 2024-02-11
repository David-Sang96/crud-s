const Sequelize = require("sequelize");
const database = require("../ultis/database");
const Post = database.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Post;
