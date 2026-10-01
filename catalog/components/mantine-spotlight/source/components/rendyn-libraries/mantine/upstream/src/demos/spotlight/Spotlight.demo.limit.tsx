"use client";

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

import { SpotlightActionData } from '@mantine/spotlight';

import { SpotlightDemoBase } from '@/components/rendyn-libraries/mantine/upstream/src/demos/spotlight/_demo-base';

const actions: SpotlightActionData[] = Array(3000)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <SpotlightDemoBase
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
      limit={7}
      shortcut={null}
      searchProps={{
        leftSection: <MagnifyingGlassIcon size={20} />,
        placeholder: 'Search...',
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
