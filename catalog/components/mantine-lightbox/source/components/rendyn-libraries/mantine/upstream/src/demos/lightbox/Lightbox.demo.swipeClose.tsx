"use client";

import { useState } from 'react';

import { Button, Group } from '@mantine/core';

import { Lightbox, LightboxSlideData } from '@mantine/lightbox';

import { images } from '@/components/rendyn-libraries/mantine/upstream/src/demos/lightbox/_images';

const slides: LightboxSlideData[] = images.slice(0, 3).map((src) => ({ src }));

function Demo() {
  const [opened, setOpened] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  return (
    <>
      <Lightbox
        opened={opened}
        onClose={() => setOpened(false)}
        slides={slides}
        closeOnSwipeDown={swipeEnabled}
      />

      <Group>
        <Button onClick={() => setOpened(true)}>Open lightbox</Button>

        <Button variant="default" onClick={() => setSwipeEnabled((v) => !v)}>
          Swipe close: {swipeEnabled ? 'enabled' : 'disabled'}
        </Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
