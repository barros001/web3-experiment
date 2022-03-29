import { FC } from 'react';
import Alert from '@common/components/Alert';

const InvalidChain: FC = () => {
  return (
    <Alert type="danger">
      You are not connected to the Rinkeby Test Network. Please go to MetaMask
      and connect to the correct network.
    </Alert>
  );
};

export default InvalidChain;
