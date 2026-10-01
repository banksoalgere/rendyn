"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    <Grid gap="md" rowGap="xl" columnGap="sm">
      <Col span={3}>1</Col>
      <Col span={3}>2</Col>
      <Col span={3}>3</Col>
      <Col span={3}>4</Col>
      <Col span={3}>5</Col>
      <Col span={3}>6</Col>
      <Col span={3}>7</Col>
      <Col span={3}>8</Col>
    </Grid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
