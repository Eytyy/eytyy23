import { Variants } from "framer-motion";

export const menuItemVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hidden: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};


export const menuVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
      staggerChildren: 0.2,
    },
  },
  hidden: {
    y: '-100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const footerMenuItemVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
  hidden: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.35 },
  },
};

