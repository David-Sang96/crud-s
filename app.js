const express = require("express");
const app = express();
const PORT = 5000;
const postRouter = require("./routes/post");
const { adminRouter } = require("./routes/admin");
const bodyParser = require("body-parser");

const sequelize = require("./ultis/database");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("parent middleware done");
  next();
});

app.use("/post", (req, res, next) => {
  console.log("post middleware done");
  next();
});

app.use("/admin", (req, res, next) => {
  console.log("admin middleware done");
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

app.use("/admin", adminRouter);
app.use(postRouter);

sequelize
  .sync()
  .then(app.listen(PORT))
  .catch((e) => console.log(e));
