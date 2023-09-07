const {Router} = require("express");

const {get_users,get_user} = require("../controllers/users_controller");
const is_authorized = require("../middlewares/is_authorized_middleware");

const router = Router();

router.get("/get_users",is_authorized , get_users);

router.get("/get_user/:id", is_authorized, get_user);

module.exports = router;
