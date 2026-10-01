"use client";

import { useState } from 'react';

import { Image, SimpleGrid } from '@mantine/core';

import { Lightbox, LightboxSlideData } from '@mantine/lightbox';

import { images } from '@/components/rendyn-libraries/mantine/upstream/src/demos/lightbox/_images';

const slides: LightboxSlideData[] = images.map((src) => ({ src }));

function Demo() {
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <Lightbox
        opened={opened}
        onClose={() => setOpened(false)}
        slides={slides}
        currentIndex={index}
        onIndexChange={setIndex}
        withZoom
        withThumbnails
        withFullscreen
        withDownload
      />

      <SimpleGrid cols={3}>
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            radius="md"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIndex(i);
              setOpened(true);
            }}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
