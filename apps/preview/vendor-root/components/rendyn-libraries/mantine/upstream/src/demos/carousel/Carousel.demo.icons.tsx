"use client";

import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

import { Carousel } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

function Demo() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<ArrowRightIcon size={16} />}
      previousControlIcon={<ArrowLeftIcon size={16} />}
    >
      <Slides count={5} />
    </Carousel>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
