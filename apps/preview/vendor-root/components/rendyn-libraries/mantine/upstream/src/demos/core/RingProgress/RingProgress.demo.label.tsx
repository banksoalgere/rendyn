"use client";

import { CheckIcon } from '@phosphor-icons/react';

import { ActionIcon, Center, Group, RingProgress, Text } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <CheckIcon size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
