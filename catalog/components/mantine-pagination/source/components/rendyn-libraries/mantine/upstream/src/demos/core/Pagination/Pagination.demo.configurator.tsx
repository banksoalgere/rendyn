"use client";

import { Pagination } from '@mantine/core';

function Wrapper(props: any) {
  return <Pagination total={10} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} size={"md"} radius={"md"} withControls={true} withEdges={false} disabled={false} />; }
