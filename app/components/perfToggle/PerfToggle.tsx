import { motion } from 'framer-motion';

type PerfToggleProps = {
  isOn: boolean;
  onClick: () => void;
};

const PerfToggle = ({ isOn, onClick }: PerfToggleProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute z-[100] top-12 md:top-10 right-[6rem] md:right-[7rem]
      w-16 md:w-20 h-10 md:h-14 flex items-center justify-center gap-1.5
      rounded-lg border border-white/10 shadow-lg backdrop-blur-sm
      transition-colors duration-200 ${isOn ? 'bg-sky-400/90' : 'bg-gray-700/80'}`}
    >
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-200 ${
          isOn
            ? 'bg-[rgb(128,255,0)] shadow-[0_0_6px_2px_rgba(128,255,0,0.7)]'
            : 'bg-gray-400'
        }`}
      />
      <span
        className={`text-xs font-bold tracking-wide ${
          isOn ? 'text-gray-800' : 'text-gray-200'
        }`}
      >
        FPS
      </span>
    </motion.button>
  );
};

export default PerfToggle;
