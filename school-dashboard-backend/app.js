// Core modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// local modules
const initializeDBAndServer = require("./src/config/initializeDBAndServer");
const schoolRoutes = require("./src/routes/schoolRoutes");

// middlewares
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/school-dashboard", schoolRoutes);

// initializing database and server
initializeDBAndServer(app);
