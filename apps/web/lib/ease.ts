// Shared motion tokens used by components installed from the Rendyn catalogue.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Overlay panels summoned by a direct action.
export const SPRING_PANEL = {
  type: 'spring',
  stiffness: 420,
  damping: 40,
  mass: 0.5,
} as const;
