import { useState } from 'react';
import { motion } from 'framer-motion';

const News = ({ news }) => {
  const [count, setCount] = useState(3);

  return (
    <div className="sticky top-20 text-gray-700 bg-gray-100 rounded-xl">
      <h2 className="font-bold text-xl px-3 pt-3">What's happening</h2>
      <div className="max-h-[250px] overflow-auto no-scrollbar">
        {news
          .slice(0, count)
          .reverse()
          .map((article) => (
            <motion.a
              rel="noreferrer"
              href={article.url}
              target="_blank"
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-start gap-2 hover:bg-gray-200 p-3 transition duration-200"
            >
              <div>
                <h6 className="text-sm font-bold">{article.title}</h6>
                <span>{article.source.name}</span>
              </div>
              <img
                alt="news-img"
                height="70px"
                width="80px"
                src={article.urlToImage}
                className=" object-cover rounded-lg alig self-stretch"
              />
            </motion.a>
          ))}
      </div>

      <button
        className="px-3 pb-3 text-blue-400 hover:text-blue-500 "
        onClick={() => setCount((prev) => prev + 3)}
      >
        Show more
      </button>
    </div>
  );
};

export default News;
