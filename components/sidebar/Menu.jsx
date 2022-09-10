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

const Menu = () => {
  const { data: session } = useSession();

  const MENU_ICONS = [
    { name: 'Home', icon: <HomeIcon /> },
    { name: 'Explore', icon: <HashtagIcon /> },
    { name: 'Notifications', icon: <BellIcon /> },
    { name: 'Messages', icon: <InboxIcon /> },
    { name: 'Bookmarkes', icon: <BookmarkIcon /> },
    { name: 'Lists', icon: <ClipboardIcon /> },
    { name: 'Profile', icon: <UserIcon /> },
    { name: 'More', icon: <DotsCircleHorizontalIcon /> },
  ];

  return (
    <>
      <div className="mt-3 mb-2.5">
        {MENU_ICONS.slice(0, !session ? 2 : -1).map((itm) => (
          <div
            key={itm.name}
            className="hoverEffect flex items-center justify-center xl:justify-start gap-3 text-gray-700"
          >
            <div className="h-7 w-7">{itm.icon}</div>
            <span className="hidden xl:inline">{itm.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
