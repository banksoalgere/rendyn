"use client";

import { Highlight, HighlightProps } from '@mantine/core';

function Wrapper(props: HighlightProps) {
  return <Highlight maw={400} mx="auto" {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"yellow"} highlight={"this"} children={"Highlight This, definitely THIS and also this!"} />; }
