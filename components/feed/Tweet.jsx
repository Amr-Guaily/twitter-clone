import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';

const Tweet = ({ tweet }) => {
  return (
    <div className="p-3 flex gap-2 border-b">
      {/* user Image */}
      <div>
        <img
          alt="user-img"
          width="40px"
          height="40px"
          className="rounded-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Header */}
        <div>
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 whitespace-nowrap">
              <h3 className="font-semibold text-[16px] hover:underline">
                {tweet.name}
              </h3>
              <div className="flex gap-1">
                <span className="text-sm">@{tweet.username} - </span>
                <span className="text-sm">
                  <span>2 hours ago</span>
                </span>
              </div>
            </div>

            <DotsHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 my-2">{tweet.text}</p>

        {/* Tweet Image */}

        <img
          className="rounded-xl object-cover max-h-[550px] w-full"
          alt="tweet-img"
          src={tweet.img}
        />

        {/* Icons - Actions */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {/* Comment on tweet */}
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          {/* Delete tweet */}{' '}
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          {/* Like tweet */}
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
