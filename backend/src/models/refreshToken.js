const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jti: {
    type: String,
    unique: true,
    required: true,
  },
  revoked: {
    type: Boolean,
    required: true,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
