"use client";

import { Grid } from '@mantine/core';

import { ColWrapper as Col } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Grid/_col-wrapper';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only.
    // It is not required in real projects.
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <Grid
        type="container"
        breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      >
        <Col span={{ base: 12, md: 6, lg: 3 }}>1</Col>
        <Col span={{ base: 12, md: 6, lg: 3 }}>2</Col>
        <Col span={{ base: 12, md: 6, lg: 3 }}>3</Col>
        <Col span={{ base: 12, md: 6, lg: 3 }}>4</Col>
      </Grid>
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
