const Joi = require("joi");

async function Service_Validation(payload) {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(64).required(),
    description: Joi.string().min(8).max(128).required(),
    price: Joi.number().required()
  });

  const {error} = schema.validate(payload);

  if(error) {
    return error;
  }else {
    return false;
  };
};

module.exports=Service_Validation;
