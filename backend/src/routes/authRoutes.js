const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const RefreshToken = require("../models/refreshToken");
const authMiddleware = require("../middleware/authMiddleware");

const {
  generateAccessToken,
  generateRefreshToken,
  cleartokens,
} = require("../utils/generateTokens");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide all the details",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = generateAccessToken(user._id);
    const refreshTokenData = generateRefreshToken(user._id);
    await RefreshToken.create({
      userId: user._id,
      jti: refreshTokenData.jti,
      revoked: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "User created successfully",
      accessToken: accessToken,
      refreshToken: refreshTokenData.token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Enter Correct details",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Enter Correct details",
      });
    }

    const accessToken = generateAccessToken(existingUser._id);
    const refreshTokenData = generateRefreshToken(existingUser._id);
    await RefreshToken.create({
      userId: existingUser._id,
      jti: refreshTokenData.jti,
      revoked: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "user logged in successfully",
      accessToken: accessToken,
      refreshToken: refreshTokenData.token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token required" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const storedToken = await RefreshToken.findOne({
      jti: decoded.jti,
    });
    if (!storedToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }
    if (storedToken.revoked) {
      return res.status(401).json({
        message: "Refresh token has been revoked",
      });
    }
    storedToken.revoked = true;
    await storedToken.save();
    console.log(decoded);
    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshTokenData = generateRefreshToken(decoded.userId);
    await RefreshToken.create({
      userId: decoded.userId,
      jti: newRefreshTokenData.jti,
      revoked: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenData.token,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Server Error" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/test", authMiddleware, async (req, res) => {
  res.status(201).json({ message: "You accessed the route", user: req.user });
});

module.exports = router;
