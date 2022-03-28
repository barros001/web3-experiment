import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner: FC = () => {
  return <FontAwesomeIcon icon={['fas', 'spinner']} spin />;
};

export default Spinner;
