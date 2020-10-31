const frames = {
  fadeIn: [{ opacity: 0 }, { opacity: 1 }],
  fadeOut: [{ opacity: 1 }, { opacity: 0 }],
  zoomIn: [{ transform: 'scale(1, 1)' }, { transform: 'scale(1.3, 1.3)' }, { transform: 'scale(1, 1)' }],
  zoomOut: [{ transform: 'scale(1, 1)' }, { transform: 'scale(0.7, 0.7)' }, { transform: 'scale(1, 1)' }],
  slideDown: [
    { transform: 'translateY(-50%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  slideUp: [
    { transform: 'translateY(50%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  slideLeft: [
    { transform: 'translateX(50%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  slideRight: [
    { transform: 'translateX(-50%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  flipLeft: [{ transform: 'rotateY(-360deg)' }, { transform: 'rotateY(0)' }],
  flipRight: [{ transform: 'rotateY(360deg)' }, { transform: 'rotateY(0)' }],
};

const onceOnlyFrames = new Set(['slideDown', 'slideUp', 'zoomIn']);
export { frames, onceOnlyFrames };
