"use client";

import { Box, Paper, Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Box p="md">
      <Paper maw={400} mx="auto" p="xl" {...props}>
        <Text>Paper is the most basic ui component</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that require background
          with shadow
        </Text>
      </Paper>
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent shadow={"xs"} radius={"md"} withBorder={false} />; }
