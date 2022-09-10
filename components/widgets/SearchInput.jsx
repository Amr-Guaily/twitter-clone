import { SearchIcon } from '@heroicons/react/outline';

const SearchInput = () => {
  return (
    <div className="sticky top-3">
      <div className="flex items-center p-3 relative">
        <SearchIcon className="h-5 z-20 text-gray-500" />
        <input
          className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
          type="text"
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
};

export default SearchInput;
