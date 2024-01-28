const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");

const login = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  const user = await prisma.user.findFirst((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      error: "Invalid email or password!",
    });
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
    },
    secretKey,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    { expiresIn: "1day" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  return res.json({ accessToken });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: user.userId, username: user.username },
      secretKey,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};

module.exports = { login, refreshToken };
