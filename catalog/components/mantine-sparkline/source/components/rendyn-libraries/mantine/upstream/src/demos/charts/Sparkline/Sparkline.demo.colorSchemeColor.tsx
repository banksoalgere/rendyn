"use client";

import { Sparkline } from '@mantine/charts';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/Sparkline/Sparkline.demo.colorSchemeColor.module.css';

function Demo() {
  return <Sparkline w={200} h={80} data={[10, 20, 40, 20, 40, 10, 50]} className={classes.root} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
