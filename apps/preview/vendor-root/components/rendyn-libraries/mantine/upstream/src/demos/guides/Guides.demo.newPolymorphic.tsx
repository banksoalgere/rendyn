"use client";

import { Box, BoxProps, Group, polymorphic } from '@mantine/core';

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(({ label, ...others }: MyButtonProps) => (
  <Box component="button" {...others}>
    {label}
  </Box>
));

function Demo() {
  return (
    <Group>
      <MyButton label="Button by default" />
      <MyButton
        label="MyButton as anchor"
        component="a"
        href="https://mantine.dev"
        target="_blank"
      />
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
