import Head from 'next/head';
import { Sidebar, Feed, Widgets } from '../components/index';

export default function Home({ news, randomUsers }) {
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
        <Feed />

        {/* Widgets */}
        <Widgets news={news.articles} randomUsers={randomUsers.results} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch News
  const news = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/business/us.json'
  ).then((res) => res.json());

  // Fetch News
  const randomUsers = await fetch(
    'https://randomuser.me/api/?results=25&inc=name,login,picture'
  ).then((res) => res.json());

  return {
    props: { news, randomUsers },
  };
}
