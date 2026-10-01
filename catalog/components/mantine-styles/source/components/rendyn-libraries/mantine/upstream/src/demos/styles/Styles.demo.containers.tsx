"use client";

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.containers.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>Resize parent element to see container query in action</div>
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
