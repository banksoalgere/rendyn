"use client";

import { useState } from 'react';

import { CheckIcon } from '@phosphor-icons/react';

import { Button, Menu } from '@mantine/core';

function Demo() {
  const [filters, setFilters] = useState({ open: true, drafts: false, archived: false });

  const setFilter = (key: keyof typeof filters) => (checked: boolean) =>
    setFilters((current) => ({ ...current, [key]: checked }));

  return (
    <Menu
      shadow="md"
      width={220}
      closeOnItemClick={false}
      checkIcon={<CheckIcon size={12} weight="bold" />}
    >
      <Menu.Target>
        <Button>Filters</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Filters</Menu.Label>
        <Menu.CheckboxItem checked={filters.open} onChange={setFilter('open')}>
          Open
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={filters.drafts} onChange={setFilter('drafts')}>
          Drafts
        </Menu.CheckboxItem>
        <Menu.CheckboxItem
          checked={filters.archived}
          onChange={setFilter('archived')}
          checkIcon="✦"
        >
          Archived
        </Menu.CheckboxItem>
      </Menu.Dropdown>
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
