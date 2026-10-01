"use client";

import { Grid, GridProps } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Wrapper(props: GridProps) {
  return (
    <Grid {...props} id="grid-configurator">
      <Col span={3} h={80}>
        1
      </Col>
      <Col span={3} h={120}>
        2
      </Col>
      <Col span={3} h={100}>
        3
      </Col>
    </Grid>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent justify={"flex-start"} align={"flex-start"} />; }
