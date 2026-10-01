"use client";

import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      size="sm"
      autoContrast
      color="yellow.4"
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
