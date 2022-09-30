import { SearchInput, News, RandomUsers } from '../index';

const Widgets = ({ news, randomUsers }) => {
  return (
    <div className="hidden lg:block max-w-[350px] py-3 px-4 ml-3">
      <SearchInput />
      <News news={news} />
      {/* <RandomUsers randomUsers={randomUsers} /> */}
      <p className="fixed bottom-5 ml-3 text-gray-500">
        ©2022{' '}
        <a className="font-semibold hover:underline text-gray-700" href="">
          Amr Guaily
        </a>
        . Some rights reserved.
      </p>
    </div>
  );
};

export default Widgets;
