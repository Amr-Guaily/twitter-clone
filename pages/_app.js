import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone App With Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
