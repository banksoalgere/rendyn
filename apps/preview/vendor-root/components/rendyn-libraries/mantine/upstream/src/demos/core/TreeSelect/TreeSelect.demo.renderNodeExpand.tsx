"use client";

import { CaretRightIcon } from '@phosphor-icons/react';

import { Group, TreeSelect, TreeSelectProps } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

const renderTreeNode: TreeSelectProps['renderNode'] = ({ node, hasChildren, expanded, expand }) => (
  <Group gap="xs" wrap="nowrap">
    {hasChildren ? (
      <CaretRightIcon
        size={14}
        onClick={expand}
        style={{
          cursor: 'pointer',
          transform: expanded ? 'rotate(90deg)' : undefined,
          transition: 'transform 150ms ease',
        }}
      />
    ) : (
      <span style={{ display: 'inline-block', width: 14 }} />
    )}
    <span>{node.label}</span>
  </Group>
);

function Demo() {
  return (
    <TreeSelect
      label="Your favorite item"
      placeholder="Pick value"
      data={data}
      renderNode={renderTreeNode}
      expandOnClick={false}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
