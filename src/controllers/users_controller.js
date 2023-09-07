const query = require("../controllers/queries");

const get_users = async (req, res) => {
  try {
    const users = await query.getUsers();
  
    res.json({message: "Successfully shown", data: users});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
  
const get_user = async (req, res) => {
  try {
    const {id} = req.params;
  
    const user = await query.getUser(id);

    if (!user) return res.status(404).json({message: "User not found"});

    res.json({message: "Successfully shown", data: user});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
  
module.exports = {get_users, get_user};
