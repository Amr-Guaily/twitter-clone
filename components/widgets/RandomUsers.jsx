import { useState } from 'react';
import { motion } from 'framer-motion';

const RandomUsers = ({ randomUsers }) => {
  const [count, setCount] = useState(3);

  return (
    <div className="sticky top-[25rem] text-gray-700 bg-gray-100 rounded-xl p-3">
      <h2 className="font-bold text-xl mb-3">Who to follow</h2>
      <div className="max-h-[180px] overflow-auto no-scrollbar">
        {randomUsers
          .slice(0, count)
          .reverse()
          .map((user) => (
            <motion.div
              className="my-3 flex items-center justify-between"
              key={user.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-2 items-center">
                <img
                  src={user.picture.thumbnail}
                  alt="random-user"
                  className="rounded-full"
                />
                <div className="truncate leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {user.login.username}
                  </h4>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    {user.name.first + ' ' + user.name.last}
                  </h5>
                </div>
              </div>

              <button className="bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                Follow
              </button>
            </motion.div>
          ))}
      </div>

      <button
        className="text-blue-400 hover:text-blue-500 pt-3 "
        onClick={() => setCount((prev) => prev + 3)}
      >
        Show more
      </button>
    </div>
  );
};

export default RandomUsers;
