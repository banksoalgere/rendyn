"use client";

import { Box, Button, Group, LoadingOverlay } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import { AuthenticationForm } from '@/components/rendyn-libraries/mantine/upstream/src/shared/AuthenticationForm/AuthenticationForm';

export function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <AuthenticationForm noSubmit />
      </Box>

      <Group justify="center" mt="xl">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
