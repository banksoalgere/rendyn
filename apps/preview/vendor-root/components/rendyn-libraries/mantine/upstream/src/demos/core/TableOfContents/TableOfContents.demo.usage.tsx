"use client";

import { TableOfContents } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <TableOfContents
      {...props}
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent variant={"filled"} color={"blue"} size={"md"} radius={"md"} />; }
