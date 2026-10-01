"use client";

import { Carousel } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

function Wrapper(props: any) {
  return (
    <Carousel height={200} slideSize="70%" slideGap="md" emblaOptions={props}>
      <Slides count={5} />
    </Carousel>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent align={"center"} loop={true} dragFree={false} />; }
