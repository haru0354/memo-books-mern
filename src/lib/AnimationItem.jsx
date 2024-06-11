import { motion } from "framer-motion";

const AnimationItem = ({ emotionCss, children, elType, animation, delay }) => {
  const MotionComponent = motion[elType];

  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay || 0,
        duration: 0.8,
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay || 0,
        duration: 0.8,
      },
    },
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: 0.8,
      },
    },
  };

  const fadeInOpacity = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      opacity: 1,
      x: 1,
      transition: {
        delay: delay || 0,
        duration: 0.8,
      },
    },
  };

  const animations = {
    fadeInLeft,
    fadeInRight,
    fadeInDown,
    fadeInOpacity,
  };

  return (
    <MotionComponent
      variants={animations[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      css={emotionCss}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimationItem;
