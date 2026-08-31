'use client';

import { useIsPresent } from 'motion/react';
import type { ReactNode } from 'react';

interface PresenceGateProps {
  children: (props: {
    gate: {
      inert: boolean;
      style: { pointerEvents: 'auto' | 'none' };
    };
  }) => ReactNode;
}

export function PresenceGate({ children }: PresenceGateProps) {
  const isPresent = useIsPresent();

  return children({
    gate: {
      inert: !isPresent,
      style: { pointerEvents: isPresent ? 'auto' : 'none' },
    },
  });
}
