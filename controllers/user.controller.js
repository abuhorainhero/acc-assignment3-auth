const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const verified = await jwt.verify(
      req.headers.token,
      process.env.JWT_SECRET
    );
    console.log("JWTTTTTT", verified);
    if (!verified) {
      return res.status(400).json({
        error: true,
        data: null,
        token: null,
        message: "User not authenticated",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
      data: undefined,
      token: undefined,
      message: "Something went wrong",
    });
  }
};

hashPassword = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const saltRound = 10;
    body.password = await hashPassword(body.password, saltRound);
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "Registration Complete",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
      data: null,
      token: null,
      message: "Something went wrong",
    });
  }
};

comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      }
      resolve(match);
    });
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const matchPassword = await comparePassword(
      req.body.password,
      user.password
    );
    console.log(matchPassword);
    if (!matchPassword) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: "User credentials did not match",
      });
    }
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};
