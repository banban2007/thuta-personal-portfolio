import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Transition = ({ children }) => {
  return (
 <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.4, // Curtain အပေါ်တက်သွားတဲ့အထိ ခဏစောင့်မယ်
        ease: [0.33, 1, 0.68, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;