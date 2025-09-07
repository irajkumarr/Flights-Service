const express = require("express");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { errorHandler } = require("./middlewares");

const app = express();

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", apiRoutes);

//* Error Handler
app.use(errorHandler);

//Server starting
app.listen(ServerConfig.PORT, () => {
  console.log(`Server started at PORT ${ServerConfig.PORT}`);
});
