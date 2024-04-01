const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const findUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        return decoded._id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

module.exports = findUserIdFromToken;