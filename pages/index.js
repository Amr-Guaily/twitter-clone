import { Sidebar, Feed, Widgets, Loginbar } from '../components/index';

export default function Home({ news, randomUsers }) {
  return (
    <div>
      <main className="flex justify-center min-h-screen max-w-[1200px] mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets news={news.articles} randomUsers={randomUsers.results} />
      </main>

      {/* Login bar */}
      <Loginbar />
    </div>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=100, stale-while-revalidate=590'
  );

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
