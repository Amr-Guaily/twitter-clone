import reactDom from 'react-dom';
import { Backdrop } from '../index';
import { motion } from 'framer-motion';

const DeleteModal = ({ setShow, deleteHandler }) => {
  if (typeof window === 'object') {
    return reactDom.createPortal(
      <div className="w-full h-full fixed top-0 left-0 flex justify-center z-20">
        <Backdrop setShow={setShow} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-4 fixed w-[30rem] top-[40vh] shadow-md text-center"
        >
          <p className=" font-semibold text-lg text-gray-700">
            Are you sure you want to delete that tweet?
          </p>
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={deleteHandler}
              className="px-5 text-lg py-1 bg-blue-500 hover:brightness-95 transition duration-150 text-white rounded-md font-semibold "
            >
              Confirm
            </button>
            <button
              onClick={() => setShow(false)}
              className="px-5 text-lg py-1 bg-blue-500 hover:brightness-95 transition duration-150 text-white rounded-md font-semibold "
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>,
      document.getElementById('portal')
    );
  }

  return null;
};

export default DeleteModal;
