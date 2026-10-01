"use client";

import { useState } from 'react';

import { Button, Group, Select } from '@mantine/core';

import { Lightbox, LightboxSlideData } from '@mantine/lightbox';

import { images } from '@/components/rendyn-libraries/mantine/upstream/src/demos/lightbox/_images';

const slides: LightboxSlideData[] = images.map((src) => ({ src }));

function Demo() {
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState<string | null>('pop');

  return (
    <>
      <Lightbox
        opened={opened}
        onClose={() => setOpened(false)}
        slides={slides}
        currentIndex={index}
        onIndexChange={setIndex}
        transitionProps={{ transition: transition as any, duration: 400 }}
      />

      <Group align="flex-end">
        <Select
          label="Transition"
          data={['fade', 'pop', 'scale', 'slide-up', 'slide-down', 'rotate-left']}
          value={transition}
          onChange={setTransition}
          allowDeselect={false}
        />
        <Button onClick={() => setOpened(true)}>Open lightbox</Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
