const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { ResOwner } = require("../models/resowner");

// Route to update user password
router.post("/", async (req, res) => {
  try {
    const token = req.body.token;
    const role = req.body.role;
    if (!token || !role)
      return res.status(400).send({ message: "Token or role not provided" });

    const userId = findUserIdFromToken(token);
    let user;
    if (role === "user") {
      user = await User.findOne({ _id: userId });
    } else {
      user = await ResOwner.findOne({ _id: userId });
    }

    if (!user) return res.status(401).send({ message: "User not logged in" });

    const validPassword = await bcrypt.compare(
      req.body.currPassword,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    if (role === "user") {
      await User.updateOne(
        { _id: userId },
        { $set: { password: hashPassword } }
      );
    } else {
      await ResOwner.updateOne(
        { _id: userId },
        { $set: { password: hashPassword } }
      );
    }

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
