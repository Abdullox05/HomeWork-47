const {Router} = require("express");

const {create_transaction, get_transactions, get_transaction} = require("../controllers/transaction_controller");
const is_authorized = require("../middlewares/is_authorized_middleware");

const router = Router();

router.post("/create_transaction", is_authorized, create_transaction);

router.get("/get_transactions", is_authorized, get_transactions);

router.get("/get_transaction/:id", is_authorized, get_transaction);

module.exports = router;
