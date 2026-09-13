import { motion } from 'framer-motion';

export function EventCard({ children }) {
  return <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full min-w-0">{children}</motion.article>;
}

export function EventBanner({ src, previewSrc, title, onClick }) {
  const clickSrc = previewSrc || src;
  return <button type="button" onClick={() => onClick(clickSrc, title)} aria-label={`Preview ${title} banner`} className="group h-48 shrink-0 w-full flex items-center justify-center overflow-hidden bg-[#190b55]">
    <img src={src} alt={title} className="w-full h-full object-cover cursor-pointer group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300" />
  </button>;
}
