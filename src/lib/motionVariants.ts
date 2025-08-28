export const leftFadeIn = {
  initial: { opacity: 0, x: -50 },
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
      bounce: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const upFadeIn = {
  initial: { opacity: 0, y: 50 },
  inView: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.6,
      bounce: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const rightFadeIn = {
  initial: { opacity: 0, x: 50 },
  inView: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4,
      duration: 0.6,
      bounce: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const downFadeIn = {
  initial: { opacity: 0, y: -50 },
  inView: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.6,
      bounce: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const pathContainer = {
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};
export const locationCard = {
  initial: { opacity: 0, scaleY: 0 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};
export const locationImage = {
  initial: { opacity: 0, y: "100%", scale: 0 },
  animate: {
    opacity: 1,
    y: "0%",
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};
export const heroLeftBtn = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.43,
      bounce: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const heroRightBtn = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.44,
      bounce: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const gradualSpacing = {
  initial: { opacity: 0, x: -18 },
  animate: {
    opacity: 1,
    x: 0,
  },
};
export const paragraphSlideIn = {
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transformOrigin: "left",
    transition: {
      duration: 0.87,
      ease: "easeOut",
      stiffness: 87,
      type: "spring",
    },
  },
};
export const pictureRollIn = {
  initial: { opacity: 0, x: 300, rotateZ: 31 },
  animate: {
    opacity: 1,
    x: 0,
    rotateZ: 0,
    transition: {
      duration: 0.87,
      ease: "linear",
      stiffness: 87,
      type: "spring",
    },
  },
};
