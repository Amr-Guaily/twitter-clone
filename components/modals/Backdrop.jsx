import { motion } from 'framer-motion';

const Backdrop = ({ setShow }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setShow(false);
      }}
      className="w-full bg-black/50 "
    ></motion.div>
  );
};

export default Backdrop;
