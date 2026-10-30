import styles from './component-page.module.css';

export function McpCallToAction() {
  return <section className={styles.mcpCallout} aria-label="Use Rendyn with your coding agent">
    <div>
      <span className={styles.mcpEyebrow}>Better with your agent</span>
      <h2>Give your agent taste.</h2>
      <p>The best way to use Rendyn is through MCP. Let your agent find the right component, compare previews and bring the source into your project.</p>
      <p className={styles.mcpAccess}>All components are free. Sign up only to connect MCP.</p>
    </div>
    <a className={styles.mcpConnect} data-analytics-action="connect-mcp" href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
  </section>;
}
