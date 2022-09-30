import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { tweetsCollectionRef, storage } from '../../lib/firebase';

const AddTweet = () => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fileHandler = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    const types = ['image/png', 'image/jpeg', 'image/webp', 'image/jfif'];

    if (types.includes(selectedFile.type)) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (e) => {
      setFile(e.target.result);
    };
  };

  const submitHandler = async () => {
    // To avoid duplicate tweet
    if (loading) return;

    setLoading(true);

    // addDoc() => return a promice which resolves with docRef
    const docRef = await addDoc(tweetsCollectionRef, {
      createdAt: serverTimestamp(),
      text: input,
      userId: session.user.id,
      userImg: session.user.image,
      createdBy: session.user.name,
      userName: session.user.userName,
    });

    // Tweet with image
    // create a path in which we are going to store tweetImg in firebase storage
    const storageRef = ref(storage, `posts/${docRef.id}/tweetImg`);
    if (file) {
      await uploadString(storageRef, file, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(storageRef);
        await updateDoc(doc(tweetsCollectionRef, docRef.id), {
          imageUrl: downloadUrl,
        });
      });
    }

    setInput('');
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="flex p-3 border-b">
      <img
        src={session?.user.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />

      <div className="flex-1 divide-y">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's happening?"
          className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 no-scrollbar"
        />

        {/* Image preview */}
        {file && (
          <div className="relative">
            <XIcon
              onClick={() => setFile(null)}
              className="h-5 absolute top-2 left-2 cursor-pointer bg-white/90 hover:bg-white rounded-full text-gray-8-+00"
            />
            <img
              src={file}
              className={`${loading && 'animate-pulse'}`}
              alt="tweet-img"
            />
          </div>
        )}

        {!loading && (
          <div className="flex justify-between items-center pt-2.5">
            <div className="flex text-sky-500">
              <label>
                <input type="file" hidden onChange={fileHandler} />
                <PhotographIcon className="hoverEffect h-9 w-9 p-2 hover:bg-sky-100" />
              </label>
            </div>
            <button
              type="submit"
              disabled={!input.trim()}
              onClick={submitHandler}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTweet;
