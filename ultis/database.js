const Sequelize = require("sequelize");
const sequelize = new Sequelize("blog", "root", "davidsang", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
