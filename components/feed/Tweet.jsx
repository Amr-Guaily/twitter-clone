import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/solid';
import Moment from 'react-moment';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { tweetsCollectionRef, storage } from '../../lib/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { CommentModal, DeleteModal } from '../index';

const Tweet = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { data: session } = useSession();
  const { userImg, imageUrl, createdBy, userName, text, createdAt } = tweet;

  // Like Functionality
  useEffect(() => {
    const q = collection(tweetsCollectionRef, tweet.id, 'likes');
    const unsub = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => doc.id);
      setLikes(result);
    });

    return unsub;
  }, []);

  // Check if the current user is already liked or not
  useEffect(() => {
    setIsLiked(likes.findIndex((id) => id === session?.user.id) !== -1);
  }, [likes]);

  const likeHandler = async () => {
    if (session) {
      const docRef = doc(
        tweetsCollectionRef,
        tweet.id,
        'likes',
        session?.user.id
      );
      if (!isLiked) {
        await setDoc(docRef, { userName: session?.user.userName });
        setIsLiked(true);
      } else {
        await deleteDoc(docRef);
        setIsLiked(false);
      }
    } else {
      signIn();
    }
  };

  // Delete Functionality
  const deleteHandler = async () => {
    const docRef = doc(tweetsCollectionRef, tweet.id);
    const storageRef = ref(storage, `posts/${docRef.id}/tweetImg`);
    await deleteDoc(docRef);
    if (imageUrl) deleteObject(storageRef);
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
          <ChatIcon
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentModal(true);
            }}
            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
          />

          {/* Delete tweet */}
          {tweet.userId === session?.user.id && (
            <TrashIcon
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          {/* Like tweet */}
          <div
            className="flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              likeHandler();
            }}
          >
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
      {showDeleteModal && (
        <DeleteModal
          setShow={setShowDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
      {showCommentModal && (
        <CommentModal setShow={setShowCommentModal} tweetData={tweet} />
      )}
    </div>
  );
};

export default Tweet;
