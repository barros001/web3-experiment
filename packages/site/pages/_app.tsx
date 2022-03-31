import '../styles/globals.css';
import '@common/lib/font-awesome';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC, useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { WalletContextProvider as MetaMaskContextProvider } from '@common/lib/wallet/providers/meta-mask';
import { SnackbarContextProvider } from '@common/components/Snackbar';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </Head>
      <SnackbarContextProvider>
        <MetaMaskContextProvider>
          <Layout {...pageProps?.layoutProps}>
            <DefaultSeo
              title="Welcome"
              titleTemplate="%s | My web3 experiment"
            />
            <Component {...pageProps} />
          </Layout>
        </MetaMaskContextProvider>
      </SnackbarContextProvider>
    </>
  );
}

export default MyApp;
