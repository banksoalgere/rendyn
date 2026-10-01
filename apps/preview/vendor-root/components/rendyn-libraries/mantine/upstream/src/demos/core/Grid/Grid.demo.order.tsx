"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    <Grid>
      <Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>
        2
      </Col>
      <Col span={3} order={{ base: 3, sm: 2, lg: 2 }}>
        3
      </Col>
      <Col span={3} order={{ base: 1, sm: 3, lg: 1 }}>
        1
      </Col>
    </Grid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
