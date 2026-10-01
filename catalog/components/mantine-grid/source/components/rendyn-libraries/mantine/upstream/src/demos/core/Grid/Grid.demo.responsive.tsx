"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    <Grid>
      <Col span={{ base: 12, md: 6, lg: 3 }}>1</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>2</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>3</Col>
      <Col span={{ base: 12, md: 6, lg: 3 }}>4</Col>
    </Grid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
