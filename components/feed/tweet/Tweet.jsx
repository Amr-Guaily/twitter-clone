import {
  ChartBarIcon,
  DotsHorizontalIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { collection, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { tweetsCollectionRef } from '../../../lib/firebase';
import { AddComment, DeleteTweet, AddLike } from '../../index';

const Tweet = ({ tweet }) => {
  const { data: session } = useSession();
  const { userImg, imageUrl, createdBy, userName, text, createdAt } = tweet;

  return (
    <div className="p-3 flex gap-2 border-b hover:bg-gray-100 cursor-pointer transition duration-150">
      {/* user Image */}
      <div>
        <img
          alt="user-img"
          width="40px"
          height="40px"
          className="rounded-full"
          src={userImg}
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
                {createdBy}
              </h3>
              <div className="flex gap-1">
                <span className="text-sm">@{userName} - </span>
                <span className="text-sm">
                  <Moment fromNow>{createdAt?.toDate()}</Moment>
                </span>
              </div>
            </div>

            <DotsHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 my-2">{text}</p>

        {/* Tweet Image */}
        {imageUrl && (
          <img
            className="rounded-xl object-cover max-h-[550px] w-full"
            src={imageUrl}
            alt="tweet-img"
          />
        )}

        {/* Icons - Actions */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {/* Comment on tweet */}
          <AddComment tweetData={tweet} />

          {/* Delete tweet */}
          {tweet.userId === session?.user.id && (
            <DeleteTweet
              docRef={doc(tweetsCollectionRef, tweet.id)}
              imageUrl={imageUrl}
            />
          )}

          {/* Like tweet */}
          <AddLike
            query={collection(tweetsCollectionRef, tweet.id, 'likes')}
            docRef={doc(
              tweetsCollectionRef,
              tweet.id,
              'likes',
              session?.user.id
            )}
          />

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
