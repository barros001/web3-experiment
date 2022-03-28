import { FC, useState } from 'react';
import Spinner from '@common/components/Spinner';
import Alert from '@common/components/Alert';
import useSnackbar from '@common/lib/hooks/use-snackbar';

type Props = {
  wave: (message: string) => Promise<boolean>;
  isWorking: boolean;
};

const Form: FC<Props> = ({ wave, isWorking }) => {
  const { addItem } = useSnackbar();
  const [message, setMessage] = useState<string>('');

  const doWave = async () => {
    try {
      if (await wave(message.trim())) {
        setMessage('');
      }
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  return (
    <div className="sm:max-w-[300px] m-auto">
      <div className="mb-4">
        <textarea
          className="border rounded w-full p-3"
          rows={3}
          placeholder="Send me a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="border-lime-500 rounded text-white bg-lime-500 p-3 w-full disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        onClick={doWave}
        disabled={!message.trim() || isWorking}
      >
        {isWorking ? <Spinner /> : 'Wave at Me'}
      </button>
    </div>
  );
};

export default Form;
