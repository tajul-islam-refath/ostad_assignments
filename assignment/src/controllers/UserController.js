const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.register = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      success: false,
      data: "Email or password required",
    });
  }
  try {
    const user = new User({
      email,
      firstName,
      lastName,
      password,
    });

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  let body = req.body;

  try {
    let user = await User.aggregate([
      {
        $match: { email: body.email },
      },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
        },
      },
    ]);

    if (user.length == 0) {
      return res.status(401).json({
        success: false,
        status: "Unauthorized",
      });
    }

    let playload = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      data: user[0]["email"],
    };

    let token = jwt.sign(playload, "token12345678");
    res.status(200).json({
      success: true,
      data: user[0],
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};
