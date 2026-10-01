"use client";

import { useEffect, useState } from 'react';

import { Button, Group, MantineProvider, useMantineColorScheme } from '@mantine/core';

function Wrapper(props: any) {
  const [attr, setAttr] = useState<string | undefined>(undefined);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    setAttr(colorScheme);
  }, [colorScheme]);

  return (
    <div id="primary-color-demo-root" data-mantine-color-scheme={attr}>
      <MantineProvider
        cssVariablesSelector="#primary-color-demo-root"
        getRootElement={() => document.createElement('div')}
        theme={{ primaryShade: props.primaryShade }}
      >
        <Group>
          <Button>Filled</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
        </Group>
      </MantineProvider>
    </div>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent primaryShade={6} />; }
