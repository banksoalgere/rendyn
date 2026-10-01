'use client';

import { useState } from 'react';
import { CodeExample } from './code-example';
import Image from 'next/image';
import styles from './mcp.module.css';

const endpoint = 'https://mcp.rendyn.dev/mcp';
const clients = [
  { id: 'claude-code', name: 'Claude Code', label: 'Run in your project terminal', code: `claude mcp add --transport http rendyn --scope project ${endpoint}`, next: 'Accept the project server, then open /mcp to log in and authorize Rendyn.', docs: 'https://code.claude.com/docs/en/mcp' },
  { id: 'cursor', name: 'Cursor', label: '.cursor/mcp.json', code: `{\n  "mcpServers": {\n    "rendyn": {\n      "url": "${endpoint}"\n    }\n  }\n}`, next: 'Merge this into your existing settings. Enable Rendyn in MCP settings and complete OAuth.', docs: 'https://cursor.com/docs/mcp' },
  { id: 'codex', name: 'Codex', label: '~/.codex/config.toml', code: `[mcp_servers.rendyn]\nurl = "${endpoint}"`, next: 'Merge into your config, then run codex mcp login rendyn. Start a fresh session to load the tools.', docs: 'https://developers.openai.com/codex/mcp/' },
];

export function ClientSetup() {
  const [selected, setSelected] = useState(0);
  const client = clients[selected];
  return <div className={styles.setupCard}>
    <div className={styles.clientLinks} role="group" aria-label="Choose your coding client">
      {clients.map((item, index) => <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="mcp-client-config" onClick={() => setSelected(index)}><Image src={`/agent-logos/${item.id}.svg`} alt="" width="24" height="24" />{item.name}</button>)}
    </div>
    <div id="mcp-client-config" aria-live="polite" aria-atomic="true">
      <h3>{client.name} setup</h3>
      <CodeExample key={client.id} label={client.label} code={client.code} />
      <p>{client.next}</p>
      <a className={styles.textLink} href={client.docs}>Official {client.name} documentation ↗</a>
    </div>
    <div className={styles.connectionSteps}><span><b>1</b> Add server</span><i aria-hidden="true">→</i><span><b>2</b> Authorize</span><i aria-hidden="true">→</i><span><b>3</b> Ask for UI</span></div>
  </div>;
}
