"use client";

import { Splitter, SplitterProps } from '@mantine/core';

function Wrapper(props: SplitterProps) {
  return (
    <Splitter {...props} h={200}>
      <Splitter.Pane
        defaultSize={50}
        min={20}
        bg="blue"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        First pane
      </Splitter.Pane>
      <Splitter.Pane
        defaultSize={50}
        min={20}
        bg="teal"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Second pane
      </Splitter.Pane>
    </Splitter>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent orientation={"horizontal"} />; }
