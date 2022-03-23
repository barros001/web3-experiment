export type Transaction = {
  hash: string;
  status: 'pending' | 'mined' | 'failed';
};

export type Wave = {
  waver: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'mined';
};

export type Prize = {
  receiver: string;
  timestamp: Date;
  amount: string;
};
