const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) return res.status(401).json({ error: "Access denied" });

  const bearer = bearerToken.split(" ");
  const token = bearer[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
