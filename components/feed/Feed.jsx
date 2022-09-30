import { SparklesIcon } from '@heroicons/react/outline';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { tweetsCollectionRef } from '../../lib/firebase';
import { AddTweet, Tweet, Loader } from '../index';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

// const dummy_data = [
//   {
//     id: '1',
//     name: 'Sahand Ghavidel',
//     username: 'codewithsahand',
//     userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
//     img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
//     text: 'nice view!',
//     timestamp: '2 hours ago',
//   },
//   {
//     id: '2',
//     name: 'Sahand Ghavidel',
//     username: 'codewithsahand',
//     userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
//     img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
//     text: 'wow!',
//     timestamp: '2 days ago',
//   },
//   {
//     id: '3',
//     name: 'Sahand Ghavidel',
//     username: 'codewithsahand',
//     userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
//     img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
//     text: 'wow!',
//     timestamp: '2 days ago',
//   },
// ];

const Feed = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(tweetsCollectionRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(result);
      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <div className="sm:ml-[75px] xl:ml-[300px] border-r border-l flex-1 max-w-[580px]">
      {/* Header */}
      <div className="flex justify-between items-center sticky top-0 bg-white/95 border-b py-2 px-3 backdrop-blur-sm z-10">
        <h1 className="text-lg font-semibold cursor-pointer">Home</h1>
        <div className="hoverEffect flex items-center justify-center px-0 w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      {/* Add Tweet */}
      {session && <AddTweet />}
      {/* Tweet */}
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          {tweets.map((tweetData) => (
            <motion.div
              key={tweetData.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <div onClick={() => router.push(`/tweets/${tweetData.id}`)}>
                <Tweet tweet={tweetData} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Feed;
