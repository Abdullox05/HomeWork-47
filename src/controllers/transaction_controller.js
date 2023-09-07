const Joi = require("joi");

const query = require("./queries");

const create_transaction = async (req, res) => {
  try {
    const {to_id} = req.body;

    const {error} = Joi.object({
      to_id: Joi.number().required(),
    }).validate({to_id});

    if (error) return res.status(400).json({message: error.message});

    const from_user = await query.getUser(req.user)

    const to_service = await query.getService(to_id)
    
    if (from_user.id === to_service.owner_id) throw new Error("Same ID")

    if (from_user.balance<to_service.price) return res.status(400).json({message: "Balance is not enough"});
    
    await query.beginTransaction();

    await query.decreaseBalance(from_user.id, to_service.price);

    await query.increaseBalance(to_service.owner_id, to_service.price);

    data = await query.createTransaction(from_user.id, to_service.price, to_id);

    await query.commitTransaction();

    res.status(201).json({message: "Successfully created", data:data});
  } catch (error) {
    await query.rollBackTransaction();

    res.status(500).json({message: "Internal Server Error"});
  }
};

const get_transactions = async (req, res) => {
  try {
    const transactions = await query.getTransactions();
  
    res.json({message: "Successfully shown", data: transactions});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};
  
const get_transaction = async (req, res) => {
  try {
    const {id} = req.params;
  
    const transaction = await query.getTransaction(id);

    if (!transaction) return res.status(404).json({message: "Transaction not found"});

    res.json({message: "Successfully shown", data: transaction});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {create_transaction, get_transactions, get_transaction};
