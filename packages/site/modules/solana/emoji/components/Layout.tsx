import { FC } from 'react';
import BaseLayout from '@common/components/Layout';

const Layout: FC = (props) => {
  const { children, ...layoutProps } = props;
  return (
    <BaseLayout {...layoutProps}>
      <h1 className="text-center text-4xl mb-4">😳 Emoji Store 😈</h1>
      <p className="text-center mb-10">
        The only emoji store that accepts sh*tcoins
      </p>
      {children}
    </BaseLayout>
  );
};

export default Layout;
