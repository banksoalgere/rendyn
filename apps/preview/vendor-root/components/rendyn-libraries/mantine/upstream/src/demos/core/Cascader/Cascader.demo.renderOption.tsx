"use client";

import { Badge, Cascader, CascaderOption, CascaderProps, Group, useMatches } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

const flags: Record<string, string> = {
  jp: '🇯🇵',
  kr: '🇰🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  us: '🇺🇸',
  ca: '🇨🇦',
};

function countCities(option: CascaderOption): number {
  if (!option.children || option.children.length === 0) {
    return 1;
  }
  return option.children.reduce((acc, child) => acc + countCities(child), 0);
}

const renderCascaderOption: CascaderProps['renderOption'] = (option, level) => (
  <Group gap="xs" justify="space-between" wrap="nowrap" flex="1">
    <Group gap={6} wrap="nowrap">
      {level === 1 && <span>{flags[option.value]}</span>}
      <span>{option.label}</span>
    </Group>
    {level === 0 && (
      <Badge size="xs" variant="light" color="gray">
        {countCities(option)} cities
      </Badge>
    )}
  </Group>
);

function Demo() {
  const withColumns = useMatches({ base: false, sm: true });
  return (
    <Cascader
      withColumns={withColumns}
      label="Location"
      placeholder="Pick location"
      renderOption={renderCascaderOption}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
