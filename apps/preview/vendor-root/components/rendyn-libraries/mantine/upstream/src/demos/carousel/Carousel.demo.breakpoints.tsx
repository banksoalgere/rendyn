"use client";

import { Carousel } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md' }}
      emblaOptions={{ loop: true, align: 'start' }}
    >
      <Slides count={6} />
    </Carousel>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
