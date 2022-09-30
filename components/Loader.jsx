import { Circles } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className="flex justify-center mt-6">
      <Circles
        height="35"
        width="35"
        color="#1ea0ef"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
