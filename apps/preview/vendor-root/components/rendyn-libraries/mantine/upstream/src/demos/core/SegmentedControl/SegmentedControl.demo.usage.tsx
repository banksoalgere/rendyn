"use client";

import { SegmentedControl } from '@mantine/core';

function Wrapper(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent orientation={"horizontal"} fullWidth={false} withItemsBorders={true} size={"sm"} radius={"md"} />; }
