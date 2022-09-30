import { useRouter } from 'next/router';
import {
  Loader,
  Loginbar,
  Sidebar,
  Tweet,
  Widgets,
  Comment,
} from '../../components/index';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { tweetsCollectionRef } from '../../lib/firebase';

const TweetDetails = ({ news }) => {
  const [tweetDoc, setTweetDoc] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  // Fetch tweet data
  useEffect(() => {
    const docRef = doc(tweetsCollectionRef, id);
    getDoc(docRef).then((doc) => {
      setTweetDoc({ ...doc.data(), id: doc.id });
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Comments
  useEffect(() => {
    const q = collection(tweetsCollectionRef, id, 'comments');
    const unsub = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(results);
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-center min-h-screen max-w-[1200px] mx-auto">
        <Sidebar />

        {/* Main Content */}
        <div className="sm:ml-[75px] xl:ml-[300px] border-r border-l flex-1 max-w-[580px]">
          {/* Header */}
          <div className="flex items-center gap-2 sticky top-0 bg-white/95 border-b py-2 px-3 backdrop-blur-sm z-10">
            <Link href="/">
              <ArrowLeftIcon className="h-8 w-8 hoverEffect p-2" />
            </Link>
            <h1 className="text-lg font-semibold cursor-pointer mt-[-4px]">
              Home
            </h1>
          </div>
          <div>{<Tweet tweet={tweetDoc} />}</div>
          <div>
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>

        <Widgets news={news.articles} />
      </div>

      <Loginbar />
    </div>
  );
};

export default TweetDetails;

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
  // const randomUsers = await fetch(
  //   'https://randomuser.me/api/?results=25&inc=name,login,picture'
  // ).then((res) => res.json());

  return {
    props: { news },
  };
}
