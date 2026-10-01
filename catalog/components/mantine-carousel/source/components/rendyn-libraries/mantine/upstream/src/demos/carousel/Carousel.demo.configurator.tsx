"use client";

import { Carousel, CarouselProps } from '@mantine/carousel';

import { Slides } from '@/components/rendyn-libraries/mantine/upstream/src/demos/carousel/_slides';

function Wrapper(props: CarouselProps) {
  return (
    <Carousel height={200} slideSize="70%" {...props}>
      <Slides count={5} />
    </Carousel>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent orientation={"horizontal"} slideGap={"md"} controlsOffset={"sm"} controlSize={26} withControls={true} withIndicators={false} />; }
