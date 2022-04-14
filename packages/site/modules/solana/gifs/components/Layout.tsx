import { FC } from 'react';
import BaseLayout from '@common/components/Layout';

const Layout: FC = (props) => {
  const { children, ...layoutProps } = props;
  return (
    <BaseLayout {...layoutProps}>
      <h1 className="text-center text-4xl mb-4">🖼 GIF Portal</h1>
      <p className="text-center mb-10">
        View your GIF collection in the metaverse ✨
      </p>
      {children}
    </BaseLayout>
  );
};

export default Layout;
