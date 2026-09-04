'use client';

import { useState } from 'react';
import { FileCode, FileJson, FileText, FolderOpen } from 'lucide-react';
import { TreeProvider, TreeView, TreeNode, TreeNodeTrigger, TreeNodeContent, TreeIcon, TreeExpander, TreeLabel } from '../vendor-root/components/kibo-ui/tree';

const files = [
  { name: 'src', children: [{ name: 'components', children: [{ name: 'button.tsx' }, { name: 'card.tsx' }, { name: 'dialog.tsx' }] }, { name: 'app', children: [{ name: 'page.tsx' }, { name: 'layout.tsx' }] }] },
  { name: 'public', children: [{ name: 'favicon.svg' }] },
  { name: 'package.json' }, { name: 'README.md' },
];
type DemoFile = { name: string; children?: DemoFile[] };
const expandedByDefault = ['src', 'src/components'];

function FileRow({ file, level = 0, parent = '' }: { file: DemoFile; level?: number; parent?: string }) {
  const id = parent ? `${parent}/${file.name}` : file.name;
  const hasChildren = Boolean(file.children);
  const [expanded, setExpanded] = useState(expandedByDefault.includes(id));
  const Icon = file.name.endsWith('.json') ? FileJson : file.name.endsWith('.tsx') ? FileCode : FileText;
  return <TreeNode nodeId={id} level={level}>
    <TreeNodeTrigger role="button" tabIndex={0} aria-expanded={hasChildren ? expanded : undefined} onClick={() => setExpanded(!expanded)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}>
      <TreeExpander hasChildren={hasChildren} /><TreeIcon hasChildren={hasChildren} icon={hasChildren ? undefined : <Icon size={16} />} /><TreeLabel>{file.name}</TreeLabel>
    </TreeNodeTrigger>
    {hasChildren && <TreeNodeContent hasChildren>{file.children?.map((child) => <FileRow key={child.name} file={child} level={level + 1} parent={id} />)}</TreeNodeContent>}
  </TreeNode>;
}

export function TreePreview() {
  const [selected, setSelected] = useState<string[]>([]);
  return <div className="demo-panel demo-tree">
    <header><span><FolderOpen size={18} /> Project explorer</span><small>website</small></header>
    <TreeProvider defaultExpandedIds={expandedByDefault} selectedIds={selected} onSelectionChange={setSelected}><TreeView>{files.map((file) => <FileRow key={file.name} file={file} />)}</TreeView></TreeProvider>
    <footer aria-live="polite">{selected[0] ?? 'Select a file or expand a folder'}</footer>
  </div>;
}
