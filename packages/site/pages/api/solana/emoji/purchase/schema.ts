import Joi from 'joi';

const schema = Joi.object({
  buyer: Joi.string().required(),
  orderId: Joi.string().required(),
  productId: Joi.number().integer().required(),
});

export default schema;
