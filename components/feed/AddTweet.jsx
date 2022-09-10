import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const AddTweet = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState('');

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

        <div className="flex justify-between items-center pt-2.5">
          <div className="flex text-sky-500">
            <label>
              <input type="file" hidden />
              <PhotographIcon className="hoverEffect h-9 w-9 p-2 hover:bg-sky-100" />
            </label>
            <EmojiHappyIcon className="hoverEffect h-9 w-9 p-2 hover:bg-sky-100" />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
