"use client";

import { Pill } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Pill/_demo.module.css';

function Demo(props: any) {
  return (
    <div className={classes.demoWrapper}>
      <Pill {...props} withRemoveButton style={{ flex: 0 }}>
        Test pill
      </Pill>
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
