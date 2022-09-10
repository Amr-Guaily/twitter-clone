import Head from 'next/head';
import { Sidebar } from '../components/index';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Twitter Clone App With Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center min-h-screen max-w-[1200px] mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}

        {/* Widgets */}
      </main>
    </div>
  );
}
