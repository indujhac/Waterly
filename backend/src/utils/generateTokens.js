const jwt = require("jsonwebtoken");
const crypto = require("crypto");
function generateAccessToken(userId) {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}

function generateRefreshToken(userId) {
  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign(
    { userId: userId, jti },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return { token: refreshToken, jti: jti };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
