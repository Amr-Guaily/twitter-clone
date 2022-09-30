import reactDom from 'react-dom';
import { useState } from 'react';
import Moment from 'react-moment';
import { Backdrop } from '../index';
import { motion } from 'framer-motion';
import { XIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { tweetsCollectionRef } from '../../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const CommentModal = ({ setShow, tweetData }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const { userImg, createdBy, userName, text, createdAt } = tweetData;

  const commentHandler = async () => {
    const docRef = collection(tweetsCollectionRef, tweetData.id, 'comments');
    await addDoc(docRef, {
      comment,
      createdAt: serverTimestamp(),
      name: session.user.name,
      username: session.user.userName,
      userImg: session.user.image,
    });

    setComment('');
    setShow(false);
  };

  // Make sure we are on clint-side; portals only work on clint-side
  if (typeof window === 'object') {
    return reactDom.createPortal(
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed w-full h-full top-0 left-0 flex justify-center z-20"
      >
        <Backdrop setShow={setShow} />

        {/* Comment Modal */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl fixed w-[30rem] top-[25vh] shadow-md py-2"
        >
          {/* Close Modal */}
          <div
            onClick={() => setShow(false)}
            className="w-9 h-9 hoverEffect text-gray-700 p-1.5 mx-2 mb-2"
          >
            <XIcon />
          </div>

          {/* Tweet Info */}
          <div className="flex relative items-center gap-3 border-t pt-4 px-7">
            <img
              alt="user-img"
              src={userImg}
              width="38px"
              height="38px"
              className="rounded-full"
            />
            <div className="flex-1">
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
              </div>
              <p>{text}</p>
            </div>
          </div>

          {/* Comment Input */}
          <div className="flex relative items-start gap-3 my-8 px-7">
            <img
              alt="user-img"
              src={session?.user.image}
              width="38px"
              height="38px"
              className="rounded-full"
            />
            <span className="absolute left-[47px] top-[-100%] z-[-1]  w-[1px] bg-gray-400 h-[70px]" />
            <div className="flex-1">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What's happening?"
                className="w-full outline-none border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 no-scrollbar"
              />
            </div>
          </div>

          {/* Submit Comment */}
          <div className="flex justify-end items-center pl-16 pr-6 mb-3">
            <button
              disabled={!comment.trim()}
              onClick={commentHandler}
              type="submit"
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            >
              Reply
            </button>
          </div>
        </motion.div>
      </div>,
      document.getElementById('portal')
    );
  }

  return null;
};

export default CommentModal;
