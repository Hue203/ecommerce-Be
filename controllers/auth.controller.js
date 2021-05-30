const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const authController = {};

authController.loginWithEmail = async (req, res, next) => {
  try {
    ///login process//
    //1. get the email and password from body
    const { email, password } = req.body;

    //2. check the email exist in databaes.
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("This email is not exist");
    }
    //3. check pass is match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("wrong password");
    }
    //4. generate token
    const token = await user.generateToken();

    //5. response.
    res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = authController;
