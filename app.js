const express = require("express");
const app = express();
const PORT = 5000;
const postRouter = require("./routes/post");
const { adminRouter } = require("./routes/admin");
const bodyParser = require("body-parser");

const sequelize = require("./ultis/database");

const Post = require("./models/post");
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log("User", user);
      next();
    })
    .catch((e) => console.log(e));
});

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

app.use("/admin", adminRouter);
app.use(postRouter);

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);
sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "David", email: "luainawl@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(PORT);
  })
  .catch((e) => console.log(e));
