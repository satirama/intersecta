const frames = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 },
  ],
  fadeOut: [
    { opacity: 1 },
    { opacity: 0 },
  ],
  zoomIn: [
    { transform: 'scale(1, 1)' },
    { transform: 'scale(1.2, 1.2)' },
    { transform: 'scale(1, 1)' },
  ],
};

export { frames as default };
