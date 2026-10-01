"use client";

import { Carousel } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideGap="md"
      emblaOptions={{ dragFree: true, align: 'start' }}
    >
      <Slides count={5} />
    </Carousel>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
