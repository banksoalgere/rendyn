"use client";

import { Button, Group, Text } from '@mantine/core';

import { useCounter } from '@mantine/hooks';

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text size="md" ta="center" py="xs">
        Count: {count}
      </Text>
      <Group justify="center">
        <Button size="xs" onClick={handlers.increment}>
          Increment
        </Button>
        <Button size="xs" onClick={handlers.decrement}>
          Decrement
        </Button>
        <Button size="xs" onClick={handlers.reset}>
          Reset
        </Button>
        <Button size="xs" onClick={() => handlers.set(5)}>
          Set 5
        </Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
