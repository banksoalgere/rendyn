import ts from '../../../apps/web/node_modules/typescript/lib/typescript.js';
import type { CatalogFile, CatalogMetadata } from '../../../packages/catalog/src/types.js';
import type { LibraryConfig } from './library-config.js';
import { labelProfiles } from './label-profiles.js';
import { unique } from './metadata.js';
import { buildVisualLabels } from './visual-labels.js';
import { visualSearchTerms } from '../../../packages/catalog/src/visual.js';
import { labelSourceFiles } from './label-source-files.js';

type Component = LibraryConfig['components'][number];

interface Evidence {
  tags: Set<string>;
  attributes: Set<string>;
  inputTypes: Set<string>;
  roles: Set<string>;
  text: string[];
  interactions: Set<string>;
}

function sourceEvidence(contents: string[]): Evidence {
  const evidence: Evidence = { tags: new Set(), attributes: new Set(), inputTypes: new Set(), roles: new Set(), text: [], interactions: new Set() };
  for (const content of contents) {
    const source = ts.createSourceFile('example.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const icons = new Set<string>();
    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)
        && /lucide|remixicon|tabler.*icons|react-icons/.test(statement.moduleSpecifier.text)) {
        const bindings = statement.importClause?.namedBindings;
        if (bindings && ts.isNamedImports(bindings)) for (const binding of bindings.elements) icons.add(binding.name.text.toLowerCase());
      }
    }
    function visit(node: ts.Node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(source).split('.')[0].toLowerCase();
        if (!icons.has(tag) && !tag.endsWith('icon')) evidence.tags.add(tag);
        for (const attribute of node.attributes.properties) {
          if (!ts.isJsxAttribute(attribute)) continue;
          const name = attribute.name.getText(source);
          evidence.attributes.add(name);
          if (attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
            if (name === 'type' && ['email', 'password', 'search', 'tel', 'url', 'number', 'text', 'file', 'checkbox', 'radio'].includes(attribute.initializer.text)) evidence.inputTypes.add(attribute.initializer.text);
            if (name === 'role') evidence.roles.add(attribute.initializer.text);
          }
          const interactions: Record<string, string> = {
            onClick: 'click', onPress: 'press', onKeyDown: 'keyboard', onKeyUp: 'keyboard',
            onDrag: 'drag', onDragStart: 'drag', onDrop: 'drag', onMouseEnter: 'hover',
            onMouseLeave: 'hover', onFocus: 'focus', onScroll: 'scroll', onTouchStart: 'touch',
            onPointerDown: 'press', onPointerEnter: 'hover', onContextMenu: 'context-menu',
            onSubmit: 'submit', onValueChange: 'change', onSelect: 'select',
          };
          if (interactions[name]) evidence.interactions.add(interactions[name]);
        }
      }
      if (ts.isJsxText(node)) {
        const text = node.text.replace(/\s+/g, ' ').trim();
        if (text && text.length <= 160) evidence.text.push(text);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return evidence;
}

export function observedInteractions(files: Pick<CatalogFile, 'content'>[]): string[] {
  const evidence = sourceEvidence(files.map(file => file.content));
  const interactions = [...evidence.interactions];
  if ([...evidence.tags].some(tag => /^(?:input|textarea|textinput|inputotp|commandinput)(?:field)?$/.test(tag))) interactions.push('type');
  if (evidence.tags.has('button')) interactions.push('click');
  if (evidence.tags.has('a') || evidence.tags.has('link')) interactions.push('navigate');
  return unique(interactions);
}

const families: Array<[RegExp, string]> = [
  [/^label$/, 'label'], [/^(?:link|links|link-overlay)$/, 'link'],
  [/^(?:icon|icons|material-icons)$/, 'icon'], [/^(?:component-example|demo|complete-primitives|preview(?:-\d+)?|material)$/, 'gallery'],
  [/^questionnaire-example$/, 'form'], [/^toast-example$/, 'toast'],
  [/^(?:segmented|segmented-control)$/, 'segmented-control'], [/^(?:transfer|transfer-list)$/, 'transfer'],
  [/^(?:backdrop|overlay|layer)$/, 'overlay'], [/^(?:transition|transitions|presence|animation)$/, 'animation'],
  [/^marquee$/, 'marquee'], [/^editable$/, 'editable'], [/^mentions$/, 'mentions'],
  [/^border-beam$/, 'animation'],
  [/^watermark$/, 'watermark'], [/^result$/, 'result'], [/^download-trigger$/, 'download'],
  [/^action-bar$/, 'toolbar'], [/^speed-dial$/, 'dropdown-menu'], [/^descriptions$/, 'data-table'],
  [/^(?:app|config-provider|dates-provider|emotion|guides|changelog\d+|click-away-listener|no-ssr|portal|client-only|locale-provider|for|show|inline|with)$/, 'utility'],
  [/^(?:block-)?(?:login|account-access)(?:-|$)/, 'login'],
  [/^(?:block-)?signup(?:-|$)/, 'signup'],
  [/^(?:block-)?dashboard(?:-|$)/, 'dashboard'],
  [/^sidebar(?:-|$)/, 'sidebar'],
  [/^(?:navbar|navigation-menu|bottom-navigation|app-bar|nav-link|skip-nav|burger|table-of-contents|back-top)$/, 'navigation'],
  [/^(?:simple|group|files|tool|sources|reasoning)-chat$|^message-scroller$/, 'chat'],
  [/^shipping-address$/, 'shipping-address'], [/^(?:report-bug|feedback-form)$/, 'feedback-form'],
  [/^book-appointment$/, 'appointment'], [/^(?:preferences|notification-settings)$/, 'settings'],
  [/^(?:payments?|invoice|upcoming-payments|receiving-method|payout-threshold|transfer-funds|claimable-balance|recent-transactions)$/, 'payment'],
  [/^(?:faq|accordion)$/, 'accordion'], [/^not-found$/, 'error-page'],
  [/^(?:alert-dialog|popconfirm|activate-agent-dialog)$/, 'alert-dialog'],
  [/^(?:dialog|dialogs|modal|modals|floating-window|floating-panel)$/, 'dialog'], [/^(?:drawer|sheet|drawers)$/, 'drawer'],
  [/^(?:combobox|combobox-popover|autocomplete|auto-complete|spotlight|cascader)$/, 'combobox'],
  [/^command$/, 'command'], [/^context-menu$/, 'context-menu'],
  [/^(?:dropdown-menu|dropdown|menu|menus|menubar)$/, 'dropdown-menu'],
  [/^(?:breadcrumb|breadcrumbs)$/, 'breadcrumb'], [/^pagination$/, 'pagination'],
  [/^tabs$/, 'tabs'], [/^(?:tree|tree-view|tree-select)$/, 'tree'],
  [/^(?:data-table|data-grid)$/, 'data-table'], [/^(?:table|tables)$/, 'table'],
  [/chart|^(?:area|bar|bars-list|bubble|donut|line|pie|radar|radial|scatter|sparkline|sunburst|treemap|waffle|heatmap|matrix|funnel|gauge)$/, 'chart'],
  [/^(?:date-picker|date-input|date-time-picker|inline-date-time-picker|month-picker|year-picker|date-range-picker)/, 'date-picker'],
  [/^(?:time-input|time-picker|time-grid|time-value)$/, 'time-picker'],
  [/calendar$/, 'calendar'], [/^(?:input-otp|pin-input)$/, 'input-otp'],
  [/^password-input$/, 'password-input'], [/^(?:number-input|input-number|number-field)$/, 'number-input'],
  [/^(?:textarea|textarea-autosize)$/, 'textarea'], [/^(?:input|text-input|input-group|mask-input|tags-input|pills-input|json-input)$/, 'input'],
  [/^checkbox/, 'checkbox'], [/^(?:radio|radio-group|radio-card|radiomark|radio-buttons)$/, 'radio'],
  [/^(?:switch|switches|switch-group|labelled-switches)$/, 'switch'],
  [/^(?:select|selects|native-select|multi-select|listbox)$/, 'select'],
  [/slider$/, 'slider'], [/^(?:rating|rate)$/, 'rating'],
  [/^(?:button|buttons|button-group|unstyled-button|action-icon|icon-button|close-button|float-button|floating-action-button|loading-buttons)$/, 'button'],
  [/^toggle(?:-group|-button)?$/, 'toggle'], [/^(?:form|field|fieldset)$/, 'form'],
  [/^(?:file-upload|file-input|file-button|dropzone|upload|attachment|download-trigger)$/, 'file-upload'],
  [/^color(?:-|$)/, 'color-picker'], [/^(?:popover|popper)$/, 'popover'], [/^(?:tooltip|tooltips|toggle-tip)$/, 'tooltip'],
  [/^hover-card$/, 'hover-card'], [/^alert$/, 'alert'], [/^(?:sonner|toast|toaster|notification|notifications|message|snackbars)$/, 'toast'],
  [/^(?:progress|ring-progress|semi-circle-progress|nprogress|progress-circle|circular-progress|linear-progress)$/, 'progress'], [/^(?:loader|spinner|spin|loading-overlay|loading-card|syncing-state)$/, 'loader'],
  [/^skeleton/, 'skeleton'], [/^empty(?:-state)?$/, 'empty-state'],
  [/^(?:avatar|avatars|user)$/, 'avatar'], [/^(?:badge|badges|chip|chips|pill|tag|status|checkmark|indicator|marker|floating-indicator)$/, 'badge'],
  [/^card(?:s)?$/, 'card'], [/^(?:list|lists|data-list|listy|overflow-list|item)$/, 'list'],
  [/^carousel$/, 'carousel'], [/^(?:code|code-block|code-highlight|snippet)$/, 'code'],
  [/^(?:typography|text|title|heading|prose|blockquote|highlight|mark|em)(?:-|$)/, 'typography'],
  [/^(?:separator|divider|dividers)$/, 'separator'], [/^(?:resizable|splitter)$/, 'resizable'],
  [/^(?:scroll-area|scroll-shadow|scroller)$/, 'scroll-area'], [/^(?:collapsible|collapse|spoiler)$/, 'disclosure'],
  [/^(?:image|image-list|background-image)$/, 'image'], [/^lightbox$/, 'lightbox'],
  [/^(?:clipboard|copy-button)$/, 'clipboard'], [/^(?:qr-code|qr-connect)$/, 'qr-code'],
  [/^(?:kbd|kdb|shortcuts)$/, 'keyboard-hint'], [/^(?:steps|stepper|steppers)$/, 'stepper'], [/^timeline$/, 'timeline'],
  [/^(?:stat|statistic|number-formatter|format-number|format-byte|usage-card|rolling-number)$/, 'statistic'], [/^tour$/, 'tour'],
  [/(?:agenda|day|week|month|year)-view$|^resources-|^schedule$/, 'schedule'],
  [/^(?:rich-text-editor|tip-tap)$/, 'editor'], [/^(?:theme|theming|styles|theme-icon|mode-toggle)(?:-|$)/, 'theme'],
  [/^(?:accessibility|visually-hidden|focus-trap|screen-readers|focus)$/, 'accessibility'],
  [/^(?:absolute-center|center|aspect-ratio|box|container|grid|simple-grid|flex|stack|group|space|spacer|paper|layout|masonry|wrap|bleed|affix|anchor|float)$/, 'layout'],
];

// Prefer the outer product pattern to embedded buttons and text fields.
const sourceFamilies: Array<[RegExp, string]> = [
  [/cropper/, 'cropper'], [/stepper/, 'stepper'], [/timeline/, 'timeline'], [/\btree(?:item)?\b/, 'tree'],
  [/datatable|datagrid/, 'data-table'], [/accordion/, 'accordion'], [/alertdialog/, 'alert-dialog'],
  [/dialog|modal/, 'dialog'], [/drawer|sheet/, 'drawer'], [/navigationmenu|navbar|menubar/, 'navigation'],
  [/sidebar/, 'sidebar'], [/contextmenu/, 'context-menu'], [/dropdownmenu/, 'dropdown-menu'],
  [/command/, 'command'], [/combobox|autocomplete/, 'combobox'], [/pagination/, 'pagination'], [/breadcrumb/, 'breadcrumb'],
  [/tabs/, 'tabs'], [/datepicker/, 'date-picker'], [/calendar/, 'calendar'], [/togglegroup|\btoggle\b/, 'toggle'], [/listbox/, 'select'], [/fileupload/, 'file-upload'],
  [/inputotp/, 'input-otp'], [/slider/, 'slider'], [/tooltip/, 'tooltip'], [/popover/, 'popover'],
  [/radio/, 'radio'], [/checkbox/, 'checkbox'], [/switch/, 'switch'], [/select/, 'select'],
  [/table/, 'table'], [/carousel/, 'carousel'], [/textarea/, 'textarea'], [/input/, 'input'],
  [/button/, 'button'], [/avatar/, 'avatar'], [/badge/, 'badge'], [/alert/, 'alert'], [/card/, 'card'],
];

function humanize(value: string): string {
  const abbreviations: Record<string, string> = { ui: 'UI', api: 'API', qr: 'QR', otp: 'OTP', json: 'JSON', css: 'CSS', faq: 'FAQ', ai: 'AI', rtl: 'RTL' };
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').split(/[-\s]+/).filter(Boolean)
    .map(word => abbreviations[word.toLowerCase()] ?? word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function buildLibraryLabels(config: Pick<LibraryConfig, 'id' | 'name'>, component: Component, files: Pick<CatalogFile, 'path' | 'content'>[]) {
  const paths = new Set((component.examples ?? []).map(example => example.path));
  if (!paths.size) paths.add(component.files[0].path);
  const primaryFiles = files.filter(file => paths.has(file.path));
  if (primaryFiles.length !== paths.size) throw new Error(`Missing label evidence for ${config.id}:${component.slug}`);
  const evidence = sourceEvidence(primaryFiles.map(file => file.content));
  const variant = config.id === 'shadcn' ? component.slug.match(/^(aria|base|radix)-/)?.[1] : undefined;
  const identity = component.slug.replace(/^(?:aria|base|radix)-/, '').replace(/^blocks-block-/, '').replace(/^block-/, '');
  const tagsText = [...evidence.tags].join(' ');
  const composed = /^(?:aria|base|radix)-blocks-block-/.test(component.slug);
  let family = families.find(([pattern]) => pattern.test(identity))?.[1];
  if (composed && !family) family = /^empty-|^no-team-members$/.test(identity) ? 'empty-state' : 'product-panel';
  if (config.id === 'originui' && !family) {
    family = sourceFamilies.find(([pattern]) => pattern.test(tagsText))?.[1];
    if (/useFileUpload/.test(primaryFiles.map(file => file.content).join('\n'))) family = 'file-upload';
    if (family === 'radio' && /rate your|rating/i.test(evidence.text.join(' '))) family = 'rating';
    if (!family && (/error|warning/i.test(evidence.text.join(' ')) || /^Origin UI alert\b/i.test(component.name))) family = 'alert';
    if (evidence.roles.has('combobox') && ['command', 'button', 'popover', undefined].includes(family)) family = 'combobox';
    const number = Number(component.slug.match(/^comp-(\d+)$/)?.[1]);
    if (number >= 271 && number <= 274) family = 'alert';
    if ((number >= 302 && number <= 304) || number === 311) family = 'banner';
    if ((number >= 400 && number <= 408) || number === 412) family = 'avatar';
    if (number === 166) family = 'pricing';
    if (number === 170) family = 'billing-period';
  }
  if (/^use-/.test(identity)) family = 'utility';
  if (/^system(?:-|$)|^material-(?:customization|experimental|guides|getting-started|integrations|migration)(?:-|$)/.test(identity)) family = 'utility';
  const profile = labelProfiles.get(family ?? 'utility')!;
  const kind = composed ? 'block' : profile.kind;
  let label = humanize(identity);
  if (config.id === 'originui' && /^comp-\d+$/.test(component.slug)) {
    label = profile.name;
    if (family === 'input') {
      if (evidence.inputTypes.has('password')) label = 'Password Input';
      else if (evidence.inputTypes.has('search')) label = 'Search Input';
      else if (evidence.inputTypes.has('email')) label = 'Email Input';
      else if (evidence.inputTypes.has('tel')) label = 'Phone Input';
      if (evidence.attributes.has('required')) label = `Required ${label}`;
      if (evidence.attributes.has('readOnly')) label = `Read-only ${label}`;
    }
    const number = component.slug.match(/^comp-(\d+)$/)?.[1];
    if (number) label += ` (Example ${number})`;
  }
  const variantName: Record<string, string> = { aria: 'React Aria', base: 'Base UI', radix: 'Radix' };
  const name = `${config.name} ${label}${variant ? ` (${variantName[variant]})` : ''}`;
  const hook = /^use-/.test(identity);
  const description = family === 'product-panel'
    ? `Compose a ${humanize(identity).toLowerCase()} interface from related information and controls.` : family
    ? (hook ? `React hook example for ${identity.replace(/^use-/, '').replaceAll('-', ' ')}.` : profile.description)
    : `${humanize(identity)} example; review the bundled source and variants for its specific purpose.`;
  const labelFiles = labelSourceFiles(primaryFiles, files);
  const interactions = observedInteractions(labelFiles);
  const visual = buildVisualLabels(labelFiles, 'bundled-examples');
  const tags = unique([...profile.tags, ...(hook ? ['hook'] : []), ...(variant ? [variantName[variant].toLowerCase().replaceAll(' ', '-')] : []), ...evidence.inputTypes]);
  const aliases = unique([profile.name.toLowerCase(), ...profile.aliases, identity.replaceAll('-', ' '), component.name.toLowerCase(), component.slug]);
  const metadata: CatalogMetadata = {
    kind,
    family: family ?? 'utility', tags, aliases, interactions: unique(interactions),
    useWhen: [description],
    notIdealWhen: [kind === 'block'
      ? 'Choose a primitive when you only need one control rather than a composed interface.'
      : 'Choose a composed pattern when you need a complete interface rather than this individual component or utility.'],
    visualSignature: [family ?? identity, variant, ...evidence.inputTypes].filter(Boolean).join(':'),
    visual, exampleCount: component.examples?.length || 1,
    labelStatus: family ? 'source-labelled' : 'needs-review',
    searchText: unique([name, description, ...aliases, ...tags, ...interactions, ...visualSearchTerms(visual)]).join('\n'),
  };
  return { name, description, metadata, reviewRequired: !family,
    evidence: primaryFiles.map(file => file.path) };
}
