"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    <Grid align="stretch">
      <Col span={4} align="flex-start" style={{ minHeight: '150px' }}>
        flex-start
      </Col>
      <Col span={4} align="center" style={{ minHeight: '150px' }}>
        center
      </Col>
      <Col span={4} align="flex-end" style={{ minHeight: '150px' }}>
        flex-end
      </Col>
    </Grid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
