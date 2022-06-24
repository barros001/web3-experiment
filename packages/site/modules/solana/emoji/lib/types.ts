export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  filename: string;
  hash: string;
};

export type PurchaseResponse = {
  transaction: string;
};
