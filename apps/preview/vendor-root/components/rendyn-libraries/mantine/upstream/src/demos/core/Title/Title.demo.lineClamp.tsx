"use client";

import { Box, Title } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Box maw={400}>
      <Title order={2} {...props}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?
      </Title>
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent lineClamp={2} />; }
