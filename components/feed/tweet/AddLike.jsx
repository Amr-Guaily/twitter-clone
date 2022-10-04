import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/solid';
import { deleteDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AddLike = ({ query, docRef }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const unsub = onSnapshot(query, (snapshot) => {
      const result = snapshot.docs.map((doc) => doc.id);
      // Check if the current user is already liked or not
      setIsLiked(result.findIndex((id) => id === session?.user.id) !== -1);
      setLikes(result);
    });

    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeHandler = async () => {
    if (session) {
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

  return (
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
  );
};

export default AddLike;
