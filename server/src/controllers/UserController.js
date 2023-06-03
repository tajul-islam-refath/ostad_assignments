const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

// registation
exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Email or password is required",
      });
    }

    let hashPassword = await bcrypt.hash(password, 11);

    const user = new User({
      email,
      name,
      password: hashPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// login
exports.login = async (req, res, next) => {
  let body = req.body;
  try {

    let user = await User.findOne({ email: body.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        status: "Unauthorized",
      });
    }

    const match = await bcrypt.compare(body.password, user.password);
    console.log(match)
    if (!match) {
      return res.status(401).json({
        success: false,
        status: "Unauthorized",
      });
    }

    let playload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      data: user.email,
    };

    let token = jwt.sign(playload, "swttoken123456");
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  let email = req.email;
  try {
    await User.findOneAndUpdate({ email: email }, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.profileDetails = async (req, res) => {
  let email = req.email;
  try {
    let data = await User.aggregate([
      { $match: { email: email } },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err });
  }
};
