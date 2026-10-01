"use client";

import { Carousel } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/Carousel.demo.controlsHover.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
      <Slides count={5} />
    </Carousel>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
