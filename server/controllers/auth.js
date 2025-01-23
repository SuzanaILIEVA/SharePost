const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchema.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "The user already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Your password must be at least 6 characters." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // yeni bir user olusturuludu
    const newUser = await AuthSchema.create({
      username,
      password: passwordHash,
      email,
    });

    // yeni user uzerinden token olusturuldu
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // bir kullanıcı başarıyla kaydedildikten sonra HTTP 201 durum koduyla birlikte başarılı bir yanıt gönderir.
    res.status(201).json({ status: "OK", token, newUser });
  } catch (error) {
    console.error("Hata:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred on the server." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "OK", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// yazilan ifadenin mail tipinde olup olamdigini  belirten fonksiyon
function isEmail(emailAddress) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailAddress.match(regex)) return true;
  else return false;
}

module.exports = { register, login };
