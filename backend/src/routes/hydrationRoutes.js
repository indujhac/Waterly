const express = require("express");
const Hydration = require("../models/hydration");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const getTodayDate = () => {
  const now = new Date();

  const indiaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(now);

  return indiaDate;
};

router.get("/today", authMiddleware, async (req, res) => {
  try {
    const today = getTodayDate();

    let hydration = await Hydration.findOne({
      userId: req.user.userId,
      date: today,
    });

    if (!hydration) {
      hydration = await Hydration.create({
        userId: req.user.userId,
        date: today,
        waterAmount: 0,
        dailyGoal: 2000,
      });
    }

    res.status(200).json(hydration);
  } catch (error) {
    console.error("Get today's hydration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.patch("/today", authMiddleware, async (req, res) => {
  try {
    const { waterAmount } = req.body;

    if (typeof waterAmount !== "number" || waterAmount < 0) {
      return res.status(400).json({
        message: "Invalid water amount",
      });
    }

    const today = getTodayDate();
    const hydration = await Hydration.findOneAndUpdate(
      {
        userId: req.user.userId,
        date: today,
      },
      {
        waterAmount,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json(hydration);
    console.log9("hydration :", waterAmount);
  } catch (error) {
    console.error("Update hydration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Hydration.find({
      userId: req.user.userId,
    }).sort({ date: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Get hydration history error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;
