const mongoose = require("mongoose");

const hydrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    waterAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    dailyGoal: {
      type: Number,
      required: true,
      default: 2000,
    },
  },
  {
    timestamps: true,
  },
);

hydrationSchema.index({ userId: 1, date: 1 }, { unique: true });

const Hydration = mongoose.model("Hydration", hydrationSchema);

module.exports = Hydration;
