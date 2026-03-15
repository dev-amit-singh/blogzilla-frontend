export const getFadeVariant = (direction: "up" | "down") => ({
  hidden: {
    opacity: 0,
    y: direction === "down" ? -50 : 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
});
