"use client";

import { Splitter } from '@mantine/core';

const colors = ['blue', 'teal', 'grape', 'orange'] as const;

const labels = ['Panel A', 'Panel B', 'Panel C', 'Panel D'];

function Demo() {
  return (
    <Splitter redistribute="nearest" h={200}>
      {labels.map((label, i) => (
        <Splitter.Pane
          defaultSize={25}
          min={10}
          key={label}
          bg={colors[i]}
          c="white"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {label}
        </Splitter.Pane>
      ))}
    </Splitter>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
