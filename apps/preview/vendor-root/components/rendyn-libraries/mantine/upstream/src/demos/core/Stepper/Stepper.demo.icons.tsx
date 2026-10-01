"use client";

import { useState } from 'react';

import {
  CheckCircleIcon,
  EnvelopeOpenIcon,
  ShieldCheckIcon,
  UserCheckIcon,
} from '@phosphor-icons/react';

import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} completedIcon={<CheckCircleIcon size={18} />}>
      <Stepper.Step
        icon={<UserCheckIcon size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<EnvelopeOpenIcon size={18} />}
        label="Step 2"
        description="Verify email"
      />
      <Stepper.Step
        icon={<ShieldCheckIcon size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
