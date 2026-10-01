"use client";

import { Carousel } from '@mantine/carousel';

import { Image } from '@mantine/core';

import { images as _images } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_images';

function Demo() {
  const slides = _images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel withIndicators height={200}>
      {slides}
    </Carousel>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
