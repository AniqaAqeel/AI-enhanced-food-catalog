require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authUserRoutes = require("./routes/authUser");
const authResOwnerRoutes = require("./routes/authResOwner");
const resownerRoutes = require("./routes/resowners");
const updatePassword = require("./routes/updatePassword")
const resetPassword = require("./routes/resetPassword")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/resowners", resownerRoutes);
app.use("/api/users/auth", authUserRoutes);
app.use("/api/resowners/auth", authResOwnerRoutes);

// for users only for now
app.use("/api/users/updatePassword", updatePassword);
app.use("/api/users/resetPassword", resetPassword);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
