import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Menu, MiniProfile } from '../index';

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="hidden sm:flex fixed h-screen flex-col p-3 pb-5 xl:items-start">
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

        {/* MiniProfile */}
        {session && <MiniProfile />}
      </div>
    </div>
  );
};

export default Sidebar;
