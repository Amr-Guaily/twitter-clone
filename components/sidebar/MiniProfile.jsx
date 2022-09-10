const MiniProfile = () => {
  return (
    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
      <img
        alt="user-img"
        className="h-10 w-10 rounded-full xl:mr-2 hidden xl:inline"
      />

      <div className="leading-5 hidden xl:inline">
        <h4 className="font-bold">Amr Guaily</h4>
        <p className="text-gray-500">@amrguaily</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-8 xl:ml-6"
      >
        <g fill="#EB2500">
          <path d="M15 6.3c0 .3.2.6.5.8 1.8 1.3 2.8 3.4 2.5 5.9-.4 2.6-2.6 4.7-5.2 5-3.7.4-6.8-2.4-6.8-6 0-2 1-3.8 2.5-4.9.3-.2.5-.5.5-.8 0-.8-.9-1.3-1.6-.9C5.1 7 3.6 9.9 4 13c.5 3.6 3.4 6.5 7 6.9 4.8.5 8.9-3.2 8.9-7.9 0-2.7-1.4-5.1-3.4-6.6-.6-.4-1.5.1-1.5.9zM12 14c-.6 0-1-.4-1-1V5c0-.5.4-1 1-1 .5 0 1 .4 1 1v8c0 .6-.4 1-1 1z"></path>
        </g>
      </svg>
    </div>
  );
};

export default MiniProfile;
