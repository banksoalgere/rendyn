"use client";

import { Marquee, MarqueeProps } from '@mantine/core';

import { MantineLogo } from '@mantinex/mantine-logo';

function Wrapper(props: Partial<MarqueeProps>) {
  return (
    <Marquee {...props} mah={200} maw={400}>
      <MantineLogo width={120} type="full" color="blue" />
      <MantineLogo width={120} type="full" color="cyan" />
      <MantineLogo width={120} type="full" color="teal" />
      <MantineLogo width={120} type="full" color="green" />
      <MantineLogo width={120} type="full" color="lime" />
      <MantineLogo width={120} type="full" color="yellow" />
      <MantineLogo width={120} type="full" color="orange" />
      <MantineLogo width={120} type="full" color="red" />
    </Marquee>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent reverse={false} pauseOnHover={false} orientation={"horizontal"} repeat={4} duration={40000} gap={"md"} fadeEdges={true} />; }
