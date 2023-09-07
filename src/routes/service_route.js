const {Router} = require("express");

const {
    create_service,
    get_services,
    get_service,
    change_service,
    delete_service
} = require("../controllers/service_controller");
const is_authorized = require("../middlewares/is_authorized_middleware");

const router = Router();

router.post("/create_service", is_authorized, create_service);

router.get("/get_services", is_authorized, get_services);

router.get("/get_service/:id", is_authorized, get_service);

router.put("/change_service/:id", is_authorized, change_service);

router.delete("/delete_service/:id", is_authorized, delete_service);

module.exports = router;
