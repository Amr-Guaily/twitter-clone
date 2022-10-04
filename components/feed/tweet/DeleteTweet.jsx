import { TrashIcon } from '@heroicons/react/outline';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../../../lib/firebase';
import { DeleteModal } from '../../index';

const DeleteTweet = ({ docRef, imageUrl }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteHandler = async () => {
    const storageRef = ref(storage, `posts/${docRef.id}/tweetImg`);
    await deleteDoc(docRef);
    if (imageUrl) deleteObject(storageRef);
  };

  return (
    <>
      <TrashIcon
        onClick={(e) => {
          e.stopPropagation();
          setShowDeleteModal(true);
        }}
        className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          setShow={setShowDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};

export default DeleteTweet;
