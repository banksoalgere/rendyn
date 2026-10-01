"use client";

import { Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Text {...props}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus inventore iusto
      cum dolore molestiae perspiciatis! Totam repudiandae impedit maxime!
    </Text>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent textWrap={"wrap"} />; }
