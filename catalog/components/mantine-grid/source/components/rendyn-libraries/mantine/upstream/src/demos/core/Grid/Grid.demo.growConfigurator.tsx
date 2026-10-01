"use client";

import { Grid, GridProps } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Wrapper(props: GridProps) {
  return (
    <Grid {...props}>
      <Col span={4}>1</Col>
      <Col span={4}>2</Col>
      <Col span={4}>3</Col>
      <Col span={4}>4</Col>
      <Col span={4}>5</Col>
    </Grid>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent grow={true} gap={"md"} />; }
