import styles from './mcp.module.css';

export function WorkflowIllustration() {
  return (
    <svg className={styles.heroArt} viewBox="0 0 620 510" role="img" aria-labelledby="workflow-art-title">
      <title id="workflow-art-title">An agent sends a UI brief to Rendyn and receives component previews and React source.</title>
      <defs>
        <pattern id="mcp-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#42464b" /></pattern>
        <linearGradient id="mcp-glow" x2="1" y2="1"><stop stopColor="#24272b" /><stop offset="1" stopColor="#2c3035" /></linearGradient>
      </defs>
      <rect width="620" height="510" rx="30" fill="url(#mcp-glow)" />
      <rect width="620" height="510" rx="30" fill="url(#mcp-dots)" />
      <circle cx="314" cy="252" r="151" fill="none" stroke="#484d54" strokeDasharray="5 9" />
      <path className={styles.signal} d="M170 139H310V252H454V354" fill="none" stroke="#949ba5" strokeWidth="2" strokeDasharray="6 9" />
      <g className={styles.briefFloat}>
        <rect x="30" y="48" width="312" height="107" rx="14" fill="white" stroke="#dfe1e4" />
        <circle cx="56" cy="73" r="5" fill="#526778" /><text x="70" y="77" fill="#656a73" fontSize="11">YOUR CODING AGENT</text>
        <text x="51" y="107" fill="#16191d" fontSize="16" fontWeight="600">“An approval card for my app”</text>
        <rect x="51" y="123" width="131" height="5" rx="2.5" fill="#e6e8eb" /><rect x="190" y="123" width="73" height="5" rx="2.5" fill="#e6e8eb" />
      </g>
      <g className={styles.hubPulse}>
        <rect x="257" y="200" width="107" height="107" rx="27" fill="white" stroke="#dfe1e4" />
        <path transform="translate(278 220) scale(2)" d="M3 3h12v12H3zM18 3h5a6 6 0 0 1 0 12h-5V3ZM3 18h12v12H9a6 6 0 0 1-6-6v-6ZM18 18h5l7 12H18V18Z" fill="#24272b" />
      </g>
      <text x="310" y="333" textAnchor="middle" fill="#d4d9e0" fontSize="11" fontWeight="600" letterSpacing="2">RENDYN MCP</text>
      <g className={styles.previewFloat}>
        <rect x="391" y="144" width="201" height="194" rx="15" fill="white" stroke="#dfe1e4" />
        <rect x="405" y="158" width="173" height="107" rx="8" fill="#edf2f5" />
        <rect x="420" y="176" width="143" height="72" rx="8" fill="white" stroke="#dfe5e9" />
        <circle cx="438" cy="195" r="7" fill="#dce7ee" /><path d="m435 195 2 2 4-4" fill="none" stroke="#526778" strokeWidth="1.5" />
        <rect x="451" y="191" width="91" height="5" rx="2" fill="#949ca5" /><rect x="430" y="210" width="118" height="4" rx="2" fill="#dfe5e9" />
        <rect x="487" y="225" width="61" height="14" rx="4" fill="#526778" /><rect x="431" y="225" width="47" height="14" rx="4" fill="#e9eef1" />
        <text x="410" y="287" fill="#16191d" fontSize="13" fontWeight="600">Approval Card</text>
        <text x="410" y="311" fill="#656a73" fontSize="10">Preview first. Pick your fit.</text>
        <circle cx="567" cy="285" r="9" fill="#e9f5ed" /><path d="m563 285 3 3 5-6" fill="none" stroke="#31704b" strokeWidth="1.5" />
      </g>
      <g className={styles.sourceFloat}>
        <rect x="36" y="348" width="299" height="133" rx="14" fill="#16191d" />
        <circle cx="53" cy="366" r="3" fill="#e8b7ba" /><circle cx="65" cy="366" r="3" fill="#f0d18c" /><circle cx="77" cy="366" r="3" fill="#a4d5b6" />
        <text x="95" y="370" fill="#b3bbc5" fontSize="10">approval-card.tsx</text>
        <text x="54" y="398" fill="#dce4de" fontSize="12" fontFamily="monospace">export function ApprovalCard() {'{'}</text>
        <text x="67" y="419" fill="#abdbc6" fontSize="12" fontFamily="monospace">return &lt;Card&gt;...&lt;/Card&gt;</text>
        <text x="54" y="440" fill="#dce4de" fontSize="12" fontFamily="monospace">{'}'}</text>
        <text x="54" y="462" fill="#b3bbc5" fontSize="10">Source + dependencies + licence</text>
      </g>
      <g transform="translate(432 382)"><circle cx="35" cy="35" r="29" fill="#373d43" /><path d="m23 35 9 9 16-19" fill="none" stroke="#c5d5c9" strokeWidth="3" strokeLinecap="round" /><text x="35" y="84" textAnchor="middle" fill="#c4cad2" fontSize="11">Adapt to your app</text></g>
    </svg>
  );
}

export function ComponentIllustration({ kind }: { kind: 'approval' | 'bento' | 'command' }) {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label={`${kind === 'approval' ? 'Approval card' : kind === 'bento' ? 'Bento grid' : 'Command menu'} schematic illustration`}>
      <rect width="360" height="220" fill={kind === 'bento' ? '#edf5f0' : kind === 'command' ? '#fff2e9' : '#edf2f5'} />
      {kind === 'approval' ? <g className={styles.miniFloat}>
        <rect x="45" y="37" width="270" height="149" rx="12" fill="white" stroke="#d8e0e6" />
        <circle cx="74" cy="67" r="12" fill="#edf2f5" /><path d="m69 67 4 4 7-8" fill="none" stroke="#526778" strokeWidth="2" />
        <text x="96" y="71" fontSize="13" fontWeight="600" fill="#24272b">Ready for your review</text>
        <text x="65" y="105" fontSize="11" fill="#656a73">Update the project settings?</text>
        <rect x="65" y="119" width="209" height="4" rx="2" fill="#e4e8eb" />
        <rect x="65" y="144" width="81" height="25" rx="6" fill="#f1f3f5" /><text x="105" y="160" textAnchor="middle" fontSize="10" fill="#656a73">Reject</text>
        <rect x="155" y="144" width="139" height="25" rx="6" fill="#526778" /><text x="225" y="160" textAnchor="middle" fontSize="10" fill="white">Approve action ↗</text>
      </g> : kind === 'bento' ? <g>
        <rect x="36" y="30" width="174" height="160" rx="12" fill="white" stroke="#d4e5db" /><rect x="222" y="30" width="102" height="75" rx="12" fill="#d8eddf" /><rect x="222" y="117" width="102" height="73" rx="12" fill="white" stroke="#d4e5db" />
        <path className={styles.chartDraw} d="M55 130 77 116 97 121 117 92 138 104 160 71 188 54" fill="none" stroke="#31704b" strokeWidth="3" strokeLinecap="round" />
        <text x="55" y="159" fontSize="12" fontWeight="600" fill="#24272b">Room to grow.</text><rect x="55" y="170" width="114" height="4" rx="2" fill="#dce7e0" />
        <circle cx="273" cy="63" r="15" fill="white" /><path d="m267 63 4 4 8-9" fill="none" stroke="#31704b" strokeWidth="2" /><rect x="240" y="86" width="66" height="4" rx="2" fill="#95bba3" />
        <rect x="240" y="137" width="28" height="28" rx="7" fill="#f4d99f" /><rect x="279" y="140" width="26" height="4" rx="2" fill="#bbcbbf" /><rect x="279" y="152" width="20" height="4" rx="2" fill="#dce7e0" />
      </g> : <g className={styles.miniFloat}>
        <rect x="44" y="28" width="272" height="164" rx="12" fill="white" stroke="#ecd9cd" />
        <circle cx="67" cy="51" r="5" fill="none" stroke="#9a8b82" strokeWidth="1.5" /><path d="m71 55 4 4" stroke="#9a8b82" /><text x="87" y="56" fontSize="11" fill="#9a8b82">Search your commands...</text><path d="M44 71H316" stroke="#f0e7e0" />
        <rect x="53" y="81" width="254" height="30" rx="6" fill="#fff2e9" /><text x="67" y="100" fontSize="11" fill="#57453c">↗ Create a new project</text><text x="277" y="100" fontSize="10" fill="#9a8b82">↵</text>
        <text x="67" y="134" fontSize="11" fill="#656a73">◷ Recent projects</text><text x="67" y="163" fontSize="11" fill="#656a73">⚙ Project settings</text>
      </g>}
    </svg>
  );
}

export function ToolIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="13" fill="#f1f2f3" /><g fill="none" stroke="#34383e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{index === 0 ? <><circle cx="22" cy="22" r="8" /><path d="m28 28 7 7" /></> : index === 1 ? <><path d="m18 17-7 7 7 7m12-14 7 7-7 7m-4-17-4 20" /></> : index === 2 ? <><rect x="12" y="12" width="9" height="9" rx="2" /><rect x="27" y="12" width="9" height="9" rx="2" /><rect x="12" y="27" width="9" height="9" rx="2" /><rect x="27" y="27" width="9" height="9" rx="2" /></> : <><path d="M12 17h10l4 4h10v15H12Z" /><path d="M12 17v-5h12l4 5h8v4" /></>}</g></svg>;
}
