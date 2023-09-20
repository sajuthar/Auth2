const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.error("User already exists with email:", req.body.email);
      return res.status(409).send({ message: "User with email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hashPassword,
      confirmPassword:req.body.confirmPassword,
    });

    await userser.save();
    console.log("User created successfully:", user);
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
