import { FC, useState } from 'react';
import Spinner from '@common/components/Spinner';
import Alert from '@common/components/Alert';
import { useSnackbar } from '@common/components/Snackbar';

type Props = {
  isWorking: boolean;
  addGif: (url: string) => Promise<void>;
};

const Gifs: FC<Props> = ({ isWorking, addGif }) => {
  const [url, setUrl] = useState<string>('');
  const { addItem } = useSnackbar();

  const doAddGif = async () => {
    if (!url) {
      return;
    }

    try {
      await addGif(url);
      setUrl('');
      addItem(<Alert type="success">GIF successfully submitted!</Alert>);
    } catch (e) {
      addItem(<Alert type="danger">{(e as Error).message}</Alert>);
      console.log(e);
    }
  };

  const isUrlValid = (): boolean => {
    if (!url || !url.trim()) {
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="sm:max-w-[600px] m-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doAddGif();
        }}
      >
        <div className="mb-4">
          <input
            className="border rounded w-full p-3"
            placeholder="Enter a GIF link!"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border-lime-500 rounded text-white bg-lime-500 p-3 w-full disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={!isUrlValid() || isWorking}
        >
          {isWorking ? <Spinner /> : 'Submit GIF!'}
        </button>
      </form>
    </div>
  );
};

export default Gifs;
