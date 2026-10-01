"use client";

import { useState } from 'react';

import { Checkbox, Group, Text } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Checkbox/Checkbox.demo.card.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Card className={classes.root} checked={checked} onClick={() => setChecked((c) => !c)}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />

        <div>
          <Text className={classes.label}>mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
