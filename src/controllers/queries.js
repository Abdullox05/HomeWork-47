const {fetch,fetchOne} = require("../utils/pg");

const createUserQuery =
  "insert into users(user_name, password)values($1, $2)";

const getUsersQuery =
  "select * from users";

const getUserQuery =
  "select * from users where id = $1";

const createServiceQuery =
  "insert into services(title, description, price, owner_id)values($1, $2, $3, $4)";

const getServicesQuery =
  "select * from services";

const getServiceQuery =
  "select * from services where id = $1";

const changeServiceQuery =
  "update services set title = $1, description = $2, price = $3 where id = $4";

const deleteServiceQuery =
  "delete from services where id = $1";

const decreaseBalanceQuery =
  "update users set balance = balance - $2 where id = $1";

const increaseBalanceQuery =
  "update users set balance = balance + $2 where id = $1";

const createTransactionQuery =
  "insert into transactions(from_id, to_id, quantity)values($1, $2, $3)";

const getTransactionsQuery =
  "select * from transactions";

const getTransactionQuery =
  "select * from transactions where id = $1";

module.exports = {
  createUser: async (user_name, password) =>
    await fetchOne(createUserQuery, user_name, password),

  getUsers: async () =>
    await fetch(getUsersQuery),

  getUser: async (id) =>
    await fetchOne(getUserQuery, id),
  
  createService: async (title, description, price, owner_id) =>
    await fetchOne(createServiceQuery, title, description, price, owner_id),

  getServices: async () =>
    await fetch(getServicesQuery),
  
  getService: async (id) =>
    await fetchOne(getServiceQuery, id),
  
  changeService: async (title, description, price, id) =>
    await fetchOne(changeServiceQuery, title, description, price, id),
  
  deleteService: async (id) =>
    await fetchOne(deleteServiceQuery, id),
  
  decreaseBalance: async (from_id, quantity) =>
    await fetchOne(decreaseBalanceQuery, from_id, quantity),
  
  increaseBalance: async (to_id, quantity) =>
    await fetchOne(increaseBalanceQuery, to_id, quantity),
  
  createTransaction: async (from_id, quantity, to_id) =>
    await fetchOne(createTransactionQuery, from_id, to_id, quantity),
  
  getTransactions: async () =>
    await fetch(getTransactionsQuery),

  getTransaction: async (id) =>
    await fetchOne(getTransactionQuery, id),
  
  beginTransaction: async () => await fetchOne("BEGIN TRANSACTION"),
  
  rollBackTransaction: async () => await fetchOne("ROLLBACK"),
  
  commitTransaction: async () => await fetchOne("COMMIT"),
};
