"use client";

import { Title } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Title order={3} {...props}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus inventore iusto
      cum dolore molestiae perspiciatis! Totam repudiandae impedit maxime!
    </Title>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent textWrap={"wrap"} />; }
