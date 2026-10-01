"use client";

import { FileTextIcon, FolderOpenIcon, FolderSimpleIcon } from '@phosphor-icons/react';

import { Group, Text, TreeSelect, TreeSelectProps } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

const renderTreeNode: TreeSelectProps['renderNode'] = ({ node, hasChildren, expanded }) => (
  <Group gap="xs">
    {hasChildren ? (
      expanded ? (
        <FolderOpenIcon color="var(--mantine-color-yellow-9)" size={16} />
      ) : (
        <FolderSimpleIcon color="var(--mantine-color-yellow-9)" size={16} />
      )
    ) : (
      <FileTextIcon size={16} />
    )}
    <Text size="sm">{node.label}</Text>
  </Group>
);

function Demo() {
  return (
    <TreeSelect
      label="Your favorite item"
      placeholder="Pick value"
      data={data}
      renderNode={renderTreeNode}
      defaultExpandAll
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
