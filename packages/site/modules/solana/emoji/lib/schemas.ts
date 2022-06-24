import Joi from 'joi';

export const OrderSchema = Joi.object({
  buyer: Joi.string().required(),
  orderId: Joi.string().required(),
  productId: Joi.number().integer().required(),
});
