const express = require("express");
const cookie = require("cookie-parser");

const config = require("../config");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());

app.use("/api", routes);

app.listen(config.PORT, () => {
  console.log(config.PORT);
});
