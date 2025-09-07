const express = require("express");
const { ServerConfig } = require("./config");

const app = express();

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

//Server starting
app.listen(ServerConfig.PORT, () => {
  console.log(`Server started at PORT ${ServerConfig.PORT}`);
});
