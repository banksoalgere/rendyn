"use client";

import { Box, Group, Kbd } from '@mantine/core';

import { useHotkeys } from '@mantine/hooks';

import { modals } from '@mantine/modals';

function Shortcut({ symbol, description }: { symbol: string; description: string }) {
  return (
    <Group gap={7} p={10}>
      <Kbd fz={{ base: 16, sm: 20 }}>Ctrl</Kbd>
      <Box fz={22} fw={500}>
        +
      </Box>
      <Kbd fz={{ base: 16, sm: 20 }} w={40}>
        {symbol}
      </Kbd>

      <Box fz={{ base: 14, sm: 18 }} ms="sm">
        – {description}
      </Box>
    </Group>
  );
}

function Demo() {
  useHotkeys([
    [
      'mod + shift + alt + X',
      () =>
        modals.open({
          withCloseButton: false,
          padding: 0,
          size: 500,
          styles: {
            content: {
              height: 300,
              overflow: 'hidden',
            },
          },
          children: (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              style={{ border: 0, margin: 0, width: '100%', height: 300 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ),
        }),
    ],
  ]);

  return (
    <>
      <Shortcut symbol="K" description="Open search" />
      <Shortcut symbol="J" description="Toggle color scheme" />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
