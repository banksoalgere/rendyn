"use client";

import { FolderOpenIcon, FolderSimpleIcon } from '@phosphor-icons/react';

import cx from 'clsx';

import { Group, RenderTreeNodePayload, Tree } from '@mantine/core';

import { CssIcon, NpmIcon, TypeScriptCircleIcon } from '@mantinex/dev-icons';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Tree/data';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Tree/Tree.demo.files.module.css';

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith('package.json')) {
    return <NpmIcon size={14} />;
  }

  if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('tsconfig.json')) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <FolderOpenIcon color="var(--mantine-color-yellow-9)" size={14} />
    ) : (
      <FolderSimpleIcon color="var(--mantine-color-yellow-9)" size={14} />
    );
  }

  return null;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={6} {...elementProps} className={cx(classes.leaf, elementProps.className)}>
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      withLines
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
