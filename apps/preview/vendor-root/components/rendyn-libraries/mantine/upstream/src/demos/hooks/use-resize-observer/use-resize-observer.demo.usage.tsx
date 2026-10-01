"use client";

import { Group, Table } from '@mantine/core';

import { useResizeObserver } from '@mantine/hooks';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/hooks/use-resize-observer/use-resize-observer.demo.usage.module.css';

function Demo() {
  const [ref, rect] = useResizeObserver();

  return (
    <div className={classes.root}>
      <Group justify="center">
        <div ref={ref} className={classes.demo}>
          Resize me!
        </div>
      </Group>

      <Table
        captionSide="top"
        data={{
          caption: 'Resize element by dragging its right bottom corner',
          head: ['Property', 'Value'],
          body: [
            ['width', rect.width],
            ['height', rect.height],
          ],
        }}
      />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
