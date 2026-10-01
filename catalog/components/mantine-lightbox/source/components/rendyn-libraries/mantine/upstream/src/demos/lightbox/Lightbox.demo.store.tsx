"use client";

import { Button, Group } from '@mantine/core';

import { Lightbox, LightboxSlideData } from '@mantine/lightbox';

import { images } from '@/components/rendyn-libraries/mantine/upstream/src/demos/lightbox/_images';

const slides: LightboxSlideData[] = images.map((src, i) => ({
  src,
  caption: `Slide ${i + 1}`,
}));

function Demo() {
  return (
    <>
      <Lightbox.Provider withThumbnails />

      <Group>
        <Button onClick={() => Lightbox.open({ slides })}>Open lightbox</Button>

        <Button variant="default" onClick={() => Lightbox.open({ slides, startIndex: 2 })}>
          Open at slide 3
        </Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
