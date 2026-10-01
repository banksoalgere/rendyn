"use client";

import { Pill } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Pill/_demo.module.css';

function Wrapper(props: any) {
  return (
    <div className={classes.demoWrapper}>
      <Pill {...props}>React</Pill>
    </div>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"md"} withRemoveButton={false} />; }
