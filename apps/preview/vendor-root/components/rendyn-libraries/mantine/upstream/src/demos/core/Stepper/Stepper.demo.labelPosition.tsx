"use client";

import { useState } from 'react';

import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <Stepper active={active} onStepClick={setActive} labelPosition="bottom">
      <Stepper.Step label="Account" />
      <Stepper.Step label="Verification" />
      <Stepper.Step label="Access" />
    </Stepper>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
