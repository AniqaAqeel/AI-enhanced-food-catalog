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
const orderPlacement = require("./routes/orderPlacement");
const orderCancellation = require("./routes/orderCancellation");
const checkMyOrdersUser = require("./routes/checkMyOrdersUser");
const viewMainPage = require("./routes/viewMainPage");
const viewRestaurant = require("./routes/viewRestaurant");
const rateRestaurant = require("./routes/rateRestaurant");
const imageRestaurant = require("./routes/imageRestaurant");
const csvUpload = require("./routes/csvUpload");
const showImageRestaurant = require("./routes/showImageRestaurant");
const getMenu = require("./routes/getMenu");
const generateDescription = require("./routes/generateDescription");
const saveItems = require("./routes/saveItems");
const getResImage = require("./routes/getResImage");
const postProductImage = require("./routes/postProductImage");
const getProductImage = require("./routes/getProductImage");
const removeItem = require("./routes/removeItem");
const search = require("./routes/search")

const auth = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes

//users
app.use("/api/users", userRoutes);
app.use("/api/users/updatePassword", updatePassword);//reset password
app.use("/api/users/resetPassword", resetPassword);  //forget password
app.use("/api/users/orderPlacement", orderPlacement);   //checkout order placement
app.use("/api/users/orderCancellation", orderCancellation); // cancelling orders
app.use("/api/users/checkMyOrdersUser", checkMyOrdersUser);                                                            // check my orders
app.use("/api/users/viewMainPage", viewMainPage);//view restaurant images on main page
app.use("/api/users/viewRestaurant", viewRestaurant);
app.use("/api/users/rateRestaurant", rateRestaurant);

app.use("/api/restaurant", getResImage);//show the image on restaurant page

//resowners
app.use("/api/resowners", resownerRoutes);
app.use("/api/resowners/showProfile", showProfile);//show profile
app.use("/api/resowners/imageRestaurant", imageRestaurant);//upload image
app.use("/api/resowners/csvUpload", csvUpload);//upload csv
app.use("/api/resowners/generateDescription",generateDescription);//generate description from csv
app.use("/api/resowners/removeItem", removeItem); // to remove item once its uploaded
app.use("/api/resowners/orderCancellation", orderCancellation); // cancelling orders for resowner
                                                                        // check restaurant orders
app.use("/api/resowners/showImageRestaurant", showImageRestaurant);//show the image on my restaurant page
app.use("/api/resowners/saveItems", saveItems);//save csv items to database
app.use("/api/resowners/getMenu", getMenu)//to display item for restaurant on my restaurant page
app.use("/api/resowner/saveProductImage",postProductImage); //upload image for product (food item)
app.use("/api/resowner/getProductImage",getProductImage); //get image for product (food item

//for both
app.use("/api/users/auth", auth);
app.use("/api/showProfile", showProfile);
app.use("/api/search", search)

// junk
// app.use("/api/users/auth", authUserRoutes);
// app.use("/api/resowners/auth", authResOwnerRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));