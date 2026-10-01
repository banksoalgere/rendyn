"use client";

import { useState } from 'react';

import { Group, Radio, Text } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Radio/Radio.demo.card.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Radio.Card className={classes.root} checked={checked} onClick={() => setChecked((c) => !c)}>
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>@mantine/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Radio.Card>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
