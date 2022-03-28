export type Transaction = {
  hash: string;
  status: 'pending' | 'mined' | 'failed';
};
