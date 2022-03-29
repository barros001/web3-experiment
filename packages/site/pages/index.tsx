import Layout from '@common/components/Layout';

export default function Home() {
  return (
    <>
      <h1 className="text-center text-4xl mb-4">
        Welcome to my <span className="underline italic">web3</span> experiment!
      </h1>
    </>
  );
}

Home.Layout = Layout;
