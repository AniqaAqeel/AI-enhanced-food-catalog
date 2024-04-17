const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { ResOwner } = require("../models/resowner");

const sendVerificationEmail = (email, OTP) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Test Email",
        text: `This is a test email. http://localhost:3000/forgetpassword?otp=${OTP}&email=${email}`,
    };

    let info = transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

}

router.post("/", async (req, res) => {
    try {
        let isResOwner = false;
        if (req.body.email && req.body.otp && req.body.newPassword) {
            const userId = findUserIdFromToken(req.body.otp);
            user = await User.findOne({ "_id": userId });
            if (!user) {
                user = await ResOwner.findOne({"_id": userId});
                isResOwner = true;
            }
            
            if (user) {
                if (user.email === req.body.email) {
                    const salt = await bcrypt.genSalt(Number(process.env.SALT));
                    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
            
                    if (isResOwner) {
                        await ResOwner.findByIdAndUpdate(userId, { password: hashPassword });
                    }
                    else {
                        await User.findByIdAndUpdate(userId, { password: hashPassword });
                    }
                    return res.status(200).send({ message: "Password updated successfully" });
                }
            }
        }

        if (req.body.email) {
            user = await User.findOne({ email: req.body.email });
            if (!user) {
                user = await ResOwner.findOne({ email: req.body.email });
            }


            if (user) {
                const OTP = user.generateResetAuthToken()
                sendVerificationEmail(req.body.email, OTP);
                return res.status(200).send({ message: "Email sent!" });
            }
        }

        if (req.body.otp) {
            const userId = findUserIdFromToken(req.body.otp);
            user = await User.findOne({ "_id": userId });
            if (user) {
                return res.status(200).send({ message: "Valid OTP" });
            }
        }

        // if (req.body.newPassword) {
        //     const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //     const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
    
        //     await User.findByIdAndUpdate(userId, { password: hashPassword });
        //     return res.status(200).send({ message: "Password Updated" });

        // }

		// user = await User.findOne({ "_id": userId })
		
		// if (!user) 
		// 	return res.status(401).send({ message: "User not logged in" });
		
		// const validPassword = await bcrypt.compare(
		// 	req.body.currPassword,
		// 	user.password
		// );
		
		// if (!validPassword)
		// 	return res.status(401).send({ message: "Invalid Password" });

		// const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        // await User.findByIdAndUpdate(userId, { password: hashPassword });

        res.status(404).send({ message: "Not Found" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;