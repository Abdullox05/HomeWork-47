const bcrypt = require("bcrypt");
const Joi = require("joi");

const query = require("./queries");
const jwt = require("../utils/jwt");

const registration = async (req, res) => {
  try {
    const {user_name, password} = req.body;

    const schema = Joi.object({
      user_name: Joi.string().min(6).required(),
      password: Joi.string().min(6).required()
    });

    const {error} = schema.validate({user_name,password});

    if (error) return res.status(400).json({message: error.message});

    const users = await query.getUsers();

    const user = users.find((user) => user.user_name === user_name);

    if (user) return res.status(403).json({message: "This User-Name has already been used"});

    const hashed_password = await bcrypt.hash(password, 12);

    await query.createUser(user_name,hashed_password);

    const token = jwt.sign({user_name: user_name});

    res.cookie("Token", token, {maxAge: 60 * 60 * 1000});

    res.status(201).json({message: "Successfully Registered", data: token});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Internal Server Error"});
  }
};

const login = async (req, res) => {
  try {
    const {user_name, password} = req.body;

    const schema = Joi.object({
      user_name: Joi.string().min(6).required(),
      password: Joi.string().min(6).required()
    });

    const {error} = schema.validate({user_name,password});

    if (error) return res.status(400).json({message: error.message});

    const users = await query.getUsers();

    const user = users.find((user) => user.user_name === user_name);

    if (!user) return res.status(403).json({message: "User not found"});

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(403).json({message: "Wrong password"});

    const token = jwt.sign({user_name: user.user_name});

    res.cookie("Token", token, {maxAge: 60 * 60 * 1000});

    res.status(201).json({message: "Successfully Log-In", data: token});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {registration, login};
