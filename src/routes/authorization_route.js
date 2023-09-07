const {Router} = require("express");

const {registration,login} = require("../controllers/authorization_controller");

const router = Router();

router.post("/authorization/registration", registration);

router.post("/authorization/log_in", login);

module.exports = router;
