import { SparklesIcon } from '@heroicons/react/outline';
import { AddTweet, Tweet } from '../index';

const dummy_data = [
  {
    id: '1',
    name: 'Sahand Ghavidel',
    username: 'codewithsahand',
    userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
    text: 'nice view!',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sahand Ghavidel',
    username: 'codewithsahand',
    userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
    img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
    text: 'wow!',
    timestamp: '2 days ago',
  },
  {
    id: '3',
    name: 'Sahand Ghavidel',
    username: 'codewithsahand',
    userImg: 'https://www.adscientificindex.com/pictures/0b/50734.jpg',
    img: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
    text: 'wow!',
    timestamp: '2 days ago',
  },
];

const Feed = () => {
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
      <AddTweet />

      {/* Tweet */}
      {dummy_data.map((tweetData) => (
        <div key={tweetData.id}>
          <Tweet tweet={tweetData} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
