const jwt = require("../utils/jwt");
const query = require("../controllers/queries");

const is_authorized = (req, res, next) => {
  const token = req.cookies.Token?.split(" ")[1] || req.cookies.Token;

  if (!token) return res.status(401).json({message: "Invalid Token"});

  jwt.verify(token, async (err, data) => {
    if (err) return res.status(401).json({message: "Invalid Token"});

    const {id} =await query.getUserByName(data.user_name);

    req.user = id;
    next();
  });
};

module.exports = is_authorized;
