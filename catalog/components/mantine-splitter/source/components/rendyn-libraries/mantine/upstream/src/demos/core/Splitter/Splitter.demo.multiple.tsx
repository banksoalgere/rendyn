"use client";

import { Splitter } from '@mantine/core';

const colors = ['blue', 'teal', 'grape'] as const;

const labels = ['First', 'Second', 'Third'];

function Demo() {
  return (
    <Splitter h={200}>
      {labels.map((label, i) => (
        <Splitter.Pane
          defaultSize={i === 1 ? 50 : 25}
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
