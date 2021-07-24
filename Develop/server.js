const express = require("express");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");

require("custom-env").env("staging");

const app = express();
const PORT = process.env.PORT || 3001;

console.time;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
