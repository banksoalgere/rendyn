"use client";

import { FileTextIcon, GaugeIcon, HouseIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

import { SpotlightActionData } from '@mantine/spotlight';

import { SpotlightDemoBase } from '@/components/rendyn-libraries/mantine/upstream/src/demos/spotlight/_demo-base';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <HouseIcon size={24} />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <GaugeIcon size={24} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <FileTextIcon size={24} />,
  },
];

function Demo() {
  return (
    <SpotlightDemoBase
      actions={actions}
      nothingFound="Nothing found..."
      highlightQuery
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
