"use client";

import { useState } from 'react';

import {
  DotsSixVerticalIcon,
  FileTextIcon,
  FolderOpenIcon,
  FolderSimpleIcon,
} from '@phosphor-icons/react';

import { Group, moveTreeNode, RenderTreeNodePayload, Tree, TreeNodeData } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Tree/Tree.demo.dragDropHandle.module.css';

const demoData: TreeNodeData[] = [
  {
    label: 'Pages',
    value: 'pages',
    children: [
      { label: 'index.tsx', value: 'pages/index.tsx' },
      { label: 'about.tsx', value: 'pages/about.tsx' },
    ],
  },
  {
    label: 'Components',
    value: 'components',
    children: [
      { label: 'Header.tsx', value: 'components/Header.tsx' },
      { label: 'Footer.tsx', value: 'components/Footer.tsx' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
];

function Leaf({
  node,
  expanded,
  hasChildren,
  elementProps,
  dragHandleProps,
}: RenderTreeNodePayload) {
  return (
    <Group gap={4} {...elementProps}>
      <button
        type="button"
        {...dragHandleProps}
        className={classes.handle}
        aria-label="Drag to reorder"
      >
        <DotsSixVerticalIcon size={14} weight="bold" />
      </button>
      {hasChildren ? (
        expanded ? (
          <FolderOpenIcon size={14} style={{ opacity: 0.75 }} />
        ) : (
          <FolderSimpleIcon size={14} style={{ opacity: 0.75 }} />
        )
      ) : (
        <FileTextIcon size={14} style={{ opacity: 0.75 }} />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const [treeData, setTreeData] = useState(demoData);

  return (
    <Tree
      data={treeData}
      withDragHandle
      withLines
      onDragDrop={(payload) => setTreeData((current) => moveTreeNode(current, payload))}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
