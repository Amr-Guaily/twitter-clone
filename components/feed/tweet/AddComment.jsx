import { ChatIcon } from '@heroicons/react/outline';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { tweetsCollectionRef } from '../../../lib/firebase';
import { CommentModal } from '../../index';

const AddComment = ({ tweetData }) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [length, setLength] = useState(0);

  // Get comments length
  useEffect(() => {
    const q = collection(tweetsCollectionRef, tweetData.id, 'comments');
    const unsub = onSnapshot(q, (snapshot) => setLength(snapshot.size));

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-center">
        <ChatIcon
          onClick={(e) => {
            e.stopPropagation();
            setShowCommentModal(true);
          }}
          className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
        />
        {length > 0 && <span>{length}</span>}
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <CommentModal setShow={setShowCommentModal} tweetData={tweetData} />
      )}
    </>
  );
};

export default AddComment;
