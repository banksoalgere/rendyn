"use client";

import { Button, Group } from '@mantine/core';

import { NavigationProgress, nprogress } from '@mantine/nprogress';

function Demo() {
  return (
    <>
      <NavigationProgress />
      <Group justify="center">
        <Button onClick={() => nprogress.start()} variant="default">
          Start
        </Button>
        <Button onClick={() => nprogress.stop()} variant="default">
          Stop
        </Button>
        <Button onClick={() => nprogress.increment()} variant="default">
          Increment
        </Button>
        <Button onClick={() => nprogress.decrement()} variant="default">
          Decrement
        </Button>
        <Button onClick={() => nprogress.set(50)} variant="default">
          Set 50%
        </Button>
        <Button onClick={() => nprogress.reset()} variant="default">
          Reset
        </Button>
        <Button onClick={() => nprogress.complete()} variant="default">
          Complete
        </Button>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
