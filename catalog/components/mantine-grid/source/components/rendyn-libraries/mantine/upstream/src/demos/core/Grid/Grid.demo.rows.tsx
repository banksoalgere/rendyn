"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    <Grid>
      <Col span={4}>1</Col>
      <Col span={4}>2</Col>
      <Col span={4}>3</Col>
      <Col span={4}>4</Col>
    </Grid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
