import Joi from 'joi';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  filename: string;
  hash: string;
};

export type Order = {
  buyer: string;
  orderId: string;
  productId: number;
  product?: Product;
};

export type PurchaseResponse = {
  transaction: string;
};

export enum TransactionStatus {
  initial = 1,
  submitted,
  paid,
}
