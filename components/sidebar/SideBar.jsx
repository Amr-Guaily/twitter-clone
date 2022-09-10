import Image from 'next/image';
import { Menu, MiniProfile } from '../index';

const Sidebar = () => {
  return (
    <div>
      <div className="hidden sm:flex flex-col fixed h-screen p-3 pb-5 xl:items-start">
        {/* Twitter Logo */}
        <div>
          <Image
            className="hoverEffect p-0 hover:bg-sky-200"
            alt="twitter-logo"
            width="50"
            height="50"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          />
        </div>

        {/* Menu */}
        <Menu />

        {/* Tweet Btn */}
        <button className="bg-sky-500 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
          Tweet
        </button>

        {/* MiniProfile */}
        <MiniProfile />
      </div>
    </div>
  );
};

export default Sidebar;
