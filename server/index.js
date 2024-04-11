require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authUserRoutes = require("./routes/authUser");
const authResOwnerRoutes = require("./routes/authResOwner");
const resownerRoutes = require("./routes/resowners");
const updatePassword = require("./routes/updatePassword");
const resetPassword = require("./routes/resetPassword");
const showProfile = require("./routes/showProfile");
// const showProfileResowners = require("./routes/showProfileResowner");


const auth = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes

//users
app.use("/api/users", userRoutes);
app.use("/api/users/updatePassword", updatePassword);
app.use("/api/users/resetPassword", resetPassword);

//resowners
app.use("/api/resowners", resownerRoutes);
app.use("/api/resowners/showProfile", showProfile);


//for both
app.use("/api/users/auth", auth);
app.use("/api/showProfile", showProfile);


// junk
// app.use("/api/users/auth", authUserRoutes);
// app.use("/api/resowners/auth", authResOwnerRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
