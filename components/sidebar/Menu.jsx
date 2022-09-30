import { HomeIcon } from '@heroicons/react/solid';
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Menu = () => {
  const { data: session } = useSession();

  const MENU_ICONS = [
    { name: 'Home', icon: <HomeIcon />, link: '/' },
    { name: 'Explore', icon: <HashtagIcon />, link: '#' },
    { name: 'Notifications', icon: <BellIcon />, link: '#' },
    { name: 'Messages', icon: <InboxIcon />, link: '#' },
    { name: 'Bookmarkes', icon: <BookmarkIcon />, link: '#' },
    { name: 'Lists', icon: <ClipboardIcon />, link: '#' },
    { name: 'Profile', icon: <UserIcon />, link: '#' },
    { name: 'More', icon: <DotsCircleHorizontalIcon />, link: '#' },
  ];

  return (
    <>
      <div className="mt-3 mb-2.5">
        {MENU_ICONS.slice(0, !session ? 2 : -1).map((itm) => (
          <Link key={itm.name} href={itm.link} passHref>
            <div className="hoverEffect flex items-center justify-center xl:justify-start gap-3 text-gray-700">
              <div className="h-7 w-7">{itm.icon}</div>
              <span className="hidden xl:inline">{itm.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;
