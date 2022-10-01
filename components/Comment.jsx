import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { tweetsCollectionRef } from '../lib/firebase';

const Comment = ({ comment, tweetId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();

  // Add Like functionality
  const likeHandler = async () => {
    const docRef = doc(
      tweetsCollectionRef,
      tweetId,
      'comments',
      comment.id,
      'likes',
      session?.user.id
    );
    if (isLiked) {
      setIsLiked(false);
      await deleteDoc(docRef);
    } else {
      setIsLiked(true);
      await setDoc(docRef, { userName: session?.user.userName });
    }
  };
  useEffect(() => {
    const q = collection(
      tweetsCollectionRef,
      tweetId,
      'comments',
      comment.id,
      'likes'
    );
    const unsub = onSnapshot(q, (onSnapshot) => {
      const results = onSnapshot.docs.map((doc) => doc.id);
      setLikes(results);
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLiked(likes.findIndex((id) => id === session?.user.id) !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  // Delete functionality
  const deleteHandler = async () => {
    const docRef = doc(tweetsCollectionRef, tweetId, 'comments', comment.id);
    if (window.confirm('Are you sure you want to delete that comment..')) {
      await deleteDoc(docRef);
    }
  };

  return (
    <div className="p-3 flex gap-2 border-b hover:bg-gray-100 cursor-pointer transition duration-150">
      {/* user Image */}
      <div>
        <img
          alt="user-img"
          width="40px"
          height="40px"
          className="rounded-full"
          src={comment.userImg}
        />
      </div>

      {/* Right Side */}
      <div className="flex-1">
        {/* Header */}
        <div>
          {/* User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 whitespace-nowrap">
            <h3 className="font-semibold text-[16px] hover:underline">
              {comment.name}
            </h3>
            <div className="flex gap-1">
              <span className="text-sm">@{comment.username} - </span>
              <span className="text-sm">
                <Moment fromNow>{comment.createdAt?.toDate()}</Moment>
              </span>
            </div>
          </div>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 my-2">{comment.comment}</p>

        {/* Icons - Actions */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {/* Comment on tweet */}
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />

          {/* Delete Comment */}

          <TrashIcon
            onClick={deleteHandler}
            className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
          />

          {/* Like Comment */}
          <div className="flex items-center" onClick={likeHandler}>
            {isLiked ? (
              <FilledHeartIcon className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />
            ) : (
              <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
            )}
            {likes.length > 0 && <span>{likes.length}</span>}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>

      {/* Modales */}
      {/* {showDeleteModal && (
        <DeleteModal
          setShow={setShowDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
      {showCommentModal && (
        <CommentModal setShow={setShowCommentModal} tweetData={tweet} />
      )} */}
    </div>
  );
};

export default Comment;
