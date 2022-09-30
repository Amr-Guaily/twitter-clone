import { useSession, signIn } from 'next-auth/react';

const Loginbar = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <div className="sticky w-full h-12 md:h-20 bottom-0 left-0 bg-sky-500 flex justify-center md:justify-around items-center gap-6 text-white">
          <div className="my-3 hidden md:block">
            <span className="block text-2xl font-semibold">
              Don't miss what's happening
            </span>
            <span>People on Twitter are the first to know</span>
          </div>
          <button
            className="bg-white/90 text-black font-bold px-24 md:px-6 py-1 rounded-full"
            onClick={signIn}
          >
            Log in
          </button>
        </div>
      )}
    </>
  );
};

export default Loginbar;
