"use client";

import { useState } from 'react';

import { Box, Paper, Text } from '@mantine/core';

import { useIntersection } from '@mantine/hooks';

function Demo() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { ref, entry } = useIntersection({
    root: container,
    threshold: 1,
  });

  return (
    <Paper ref={setContainer} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--mantine-color-teal-7)'
              : 'var(--mantine-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
