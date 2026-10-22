export interface ComponentEditorial {
  displayName?: string;
  title: string;
  description: string;
  intro: string;
  useCase: string;
  setup: string;
  example: { title: string; code: string; explanation: string; css?: string };
  controls: { name: string; description: string }[];
  considerations: string[];
  source: { name: string; url: string };
  relatedSlugs: string[];
}

export const componentEditorialUpdatedAt = '2026-09-29';

// Key by the imported source slug, keeping duplicate public names and URLs distinct.
// Examples use the APIs in catalog/components/*/source, rather than newer upstream APIs.
export const componentEditorial: Record<string, ComponentEditorial> = {
  'magicui-progressive-blur': {
    title: 'Progressive Blur React Component & Scroll Example | Rendyn',
    description: 'Add progressive blur to a React scroll area. See a fixed-edge example, blur levels, browser fallback guidance and the Magic UI source preview.',
    intro: 'Progressive blur softens the edge of a React scroll area with layered backdrop filters. Use it to suggest that a list continues below the visible panel while keeping the centre clear.',
    useCase: 'A compact activity feed is a useful fit: the list scrolls inside a fixed-height panel, while the blur stays attached to the bottom of the panel. Keep important actions outside the blurred edge.',
    setup: 'Add the component and its cn utility from the Code tab, then adapt the import path. This example uses a native scroll area with React and Tailwind CSS; it does not require a separate scroll-area component.',
    example: {
      title: 'Keep the blur at the edge of an activity feed',
      code: `import { ProgressiveBlur } from "@/components/magicui/progressive-blur";

const events = ["Draft created", "Review requested", "Changes saved", "Review approved"];

export function ActivityFeed() {
  return (
    <section aria-label="Project activity" className="relative rounded-xl border">
      <div
        role="region"
        aria-label="Recent activity"
        tabIndex={0}
        className="h-56 overflow-y-auto p-4 pb-16"
      >
        <ol className="space-y-6">
          {events.map((event) => <li key={event}>{event}</li>)}
        </ol>
      </div>
      <ProgressiveBlur position="bottom" height="25%" />
    </section>
  );
}`,
      explanation: 'The relative wrapper anchors the absolute overlay. The inner region handles scrolling and can receive keyboard focus. Extra bottom padding lets the final item scroll above the blur.',
    },
    controls: [
      { name: 'position', description: 'Choose top, bottom or both. In the imported source, both fills the entire wrapper and ignores height.' },
      { name: 'height', description: 'A CSS length such as 25% or 64px sets the depth of a single-edge overlay. Keep it shallow enough for the list to remain readable.' },
      { name: 'blurLevels', description: 'The default is eight values: 0.5, 1, 2, 4, 8, 16, 32 and 64 pixels. Keep eight non-negative values when tuning intensity: the mask stops are spaced in eighths. Fewer than two values cannot render safely.' },
    ],
    considerations: [
      'The overlay uses pointer-events-none, so clicks pass through it. Blurring content does not hide it from assistive technology or protect sensitive information.',
      'Test backdrop-filter and mask-image in your supported browsers. Provide a subtle gradient fallback if the effect is unavailable, and keep the list usable without the effect.',
      'Place content beside the overlay as shown. Although the imported props declare children, this version does not render them. The effect itself has no animation or automatic scroll-position detection.',
    ],
    source: { name: 'Magic UI', url: 'https://magicui.design/docs/components/progressive-blur' },
    relatedSlugs: ['marquee', 'shader-background', 'magicui-blur-fade'],
  },
  'magicui-orbiting-circles': {
    title: 'Orbiting Circles React Component & Logo Example | Rendyn',
    description: 'Build an orbiting integration-logo visual in React. Explore radius, duration, reverse motion, required CSS and a static reduced-motion alternative.',
    intro: 'Orbiting Circles moves React children around a circular path using CSS keyframes. It suits an integration or ecosystem illustration with a clear centre and a small number of surrounding logos.',
    useCase: 'Use a central product label with surrounding integration names. This is a visual relationship diagram; it does not establish a live connection to any service.',
    setup: 'Add the OrbitingCircles component, cn utility and orbiting-circles.css from the Code tab. Include the CSS in your Tailwind setup; copying only the TSX leaves the orbit stationary.',
    example: {
      title: 'An integration orbit with a static motion alternative',
      code: `import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import "@/components/magicui/orbiting-circles.css";

const integrations = ["GitHub", "Linear", "Slack"];

export function IntegrationOrbit() {
  return (
    <figure className="relative flex h-80 w-full items-center justify-center overflow-hidden">
      <figcaption className="sr-only">Example product integrations</figcaption>
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center motion-reduce:hidden">
        <span>Workspace</span>
        <OrbitingCircles radius={100} iconSize={56} duration={30} speed={1}>
          {integrations.map((name) => (
            <span key={name} className="rounded-full border bg-background p-2 text-xs">
              {name}
            </span>
          ))}
        </OrbitingCircles>
      </div>
      <ul className="sr-only motion-reduce:not-sr-only motion-reduce:flex motion-reduce:flex-wrap motion-reduce:gap-4">
        {integrations.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </figure>
  );
}`,
      explanation: 'A 100px radius and 56px icon size need at least 256px of usable space. The animated visual is decorative for screen readers, which receive one static list. The same list becomes visible when reduced motion is requested.',
    },
    controls: [
      { name: 'radius / iconSize', description: 'Both are pixel values. Budget at least twice the radius plus the icon size, with extra room for long labels; shrink the radius or switch to a list in narrow containers.' },
      { name: 'duration / speed', description: 'Duration is seconds per revolution; the implementation divides it by speed. Use finite positive values. A larger duration slows the orbit; speed=0 is not a pause control.' },
      { name: 'reverse / path', description: 'Reverse changes direction. Set path={false} to hide the circular guide. Multiple children are spaced evenly around the same circle.' },
    ],
    considerations: [
      'The radius does not automatically follow container width. Test small screens and text zoom rather than assuming a fluid orbit.',
      'The source has no built-in motion preference handling. Supply a static alternative as shown. It also has no implemented delay control, even though delay appears in its prop type.',
      'Keep essential navigation outside a moving illustration. Use real accessible labels when replacing the example names with logo images.',
    ],
    source: { name: 'Magic UI', url: 'https://magicui.design/docs/components/orbiting-circles' },
    relatedSlugs: ['magicui-animated-beam', 'magicui-icon-cloud', 'marquee'],
  },
  'kibo-dropzone': {
    title: 'React TypeScript Dropzone & File Selection Example | Rendyn',
    description: 'Build a typed React dropzone with file acceptance, size limits and error messages. See Kibo UI callbacks and where server upload validation belongs.',
    intro: 'Dropzone is a React file-selection interface for drag-and-drop or click-to-select flows. The Kibo UI component wraps react-dropzone and provides empty and selected-file states; your application handles the upload.',
    useCase: 'Start with a single PNG or JPEG attachment. Show an error beside the control when selection is rejected, then let the user decide when to submit the accepted file.',
    setup: 'Add the Kibo UI source, its button dependency and cn utility from the Code tab. Install the listed react-dropzone and lucide-react dependencies. Keep state and callbacks in a client component.',
    example: {
      title: 'A typed image selector with a visible error state',
      code: `"use client";

import { useState } from "react";
import {
  Dropzone, DropzoneContent, DropzoneEmptyState,
  type DropzoneProps,
} from "@/components/kibo-ui/dropzone";

export function ImageAttachment() {
  const [files, setFiles] = useState<File[] | undefined>();
  const [error, setError] = useState<string | null>(null);
  const handleDrop: NonNullable<DropzoneProps["onDrop"]> = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setError(null);
  };

  return (
    <section aria-labelledby="attachment-label">
      <h3 id="attachment-label">Choose a PNG or JPEG image, up to 5 MiB</h3>
      <Dropzone
        accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        src={files}
        onDrop={handleDrop}
        onError={(reason) => setError(reason.message)}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <p id="attachment-error" role="status">{error}</p>
    </section>
  );
}`,
      explanation: 'The exported callback type carries File[], FileRejection[] and DropEvent. This example uses the accepted files only. Start src as undefined: even an empty array counts as selected content in the imported empty-state logic.',
    },
    controls: [
      { name: 'accept / maxSize / minSize', description: 'Use a MIME-type-to-extension map and size limits in bytes. These improve client selection feedback; they cannot verify file contents or authorize uploads.' },
      { name: 'maxFiles / multiple', description: 'maxFiles defaults to one. For multiple selection, explicitly set multiple={true} and a bounded maxFiles value that matches your product.' },
      { name: 'src / onDrop / onError', description: 'Keep accepted files in application state and pass them back through src. In this source, any rejection calls onError with the first rejection message and returns before onDrop, including mixed accepted/rejected drops.' },
      { name: 'disabled', description: 'Disable selection during an upload or other busy state. The UI does not start an upload or provide upload progress by itself.' },
    ],
    considerations: [
      'Validate size, actual content type, authorization and storage destination on the server before accepting an upload. Browser MIME types and filenames are untrusted input.',
      'Keep the existing selection visible when a replacement is rejected. The example stores error messages as text, so React escapes them rather than rendering HTML.',
      'If you add an image preview with URL.createObjectURL, revoke the old URL when the selection changes and on unmount. The example above displays filenames without creating object URLs.',
    ],
    source: { name: 'Kibo UI', url: 'https://www.kibo-ui.com/components/dropzone' },
    relatedSlugs: ['kibo-image-crop', 'button', 'kibo-kanban'],
  },
  'text-animation': {
    title: 'React Text Animations & Word Reveal Example | Rendyn',
    description: 'Explore React text animations with word and character reveals, blur, spring timing and viewport triggers. Includes a TextReveal integration example.',
    intro: 'This React text animation bundle includes TextReveal, chromatic word changes, shimmer, letter cascades and character scrambles. Start with a word reveal for a short headline, then choose another effect only when it fits the message.',
    useCase: 'A product heading can enter once when it becomes visible, with a brief supporting line appearing afterwards. Word-level animation keeps long phrases easier to follow than a character-by-character sequence.',
    setup: 'Add TextReveal, its cn and easing utilities from the Code tab, plus the listed motion dependency. The public page name is Text Animation; the reveal export and filename are TextReveal and text-reveal.tsx.',
    example: {
      title: 'Reveal a product heading when it enters view',
      code: `"use client";

import { TextReveal } from "@/components/motion/text-reveal";

export function ProductHeading() {
  return (
    <header>
      <TextReveal
        as="h2"
        text="Turn a draft into a clear interface"
        split="word"
        blur={6}
        stagger={0.06}
        yOffset="20%"
        whileInView
        once
        className="text-balance text-3xl font-semibold"
      />
      <TextReveal text="Choose a component, then make it yours." delay={0.3} />
    </header>
  );
}`,
      explanation: 'The heading starts at the source’s 40% visibility threshold and runs once. The supporting line uses a short mount-time delay; it is not tied to the heading’s viewport trigger.',
    },
    controls: [
      { name: 'text / split / as', description: 'Text accepts a string or array of lines. Split by word or char, and choose a semantic element such as h2. Character mode preserves word boundaries for wrapping.' },
      { name: 'stagger / delay / blur / yOffset', description: 'Stagger and delay are seconds. Blur is pixels; yOffset accepts a string or number. Shorter sequences reduce the time before the full message becomes readable.' },
      { name: 'whileInView / once / spring', description: 'whileInView enables a viewport trigger; it is false by default. once defaults to true. Spring accepts stiffness, damping and mass for the movement transition.' },
    ],
    considerations: [
      'The imported reveal reads the motion preference and replaces movement and blur with a shorter opacity transition. It still animates; provide static text if your product requires no transition at all.',
      'Keep semantic headings and ordinary text content. Test screen readers with your chosen split mode, and avoid repeated announcements or animated paragraphs of essential instructions.',
      'Shimmer is a visual effect rather than a loading-state machine. Scramble and cascade are separate exports with different APIs, not values for a TextReveal variant prop.',
    ],
    source: { name: 'beUI', url: 'https://beui.dev/components/motion/text-animation' },
    relatedSlugs: ['magicui-text-animate', 'magicui-typing-animation', 'magicui-word-rotate'],
  },
  'shader-background': {
    title: 'React Shader Background & Mesh Gradient Example | Rendyn',
    description: 'Add a React shader background with a typed variant API. See a mesh-gradient hero, Paper shaders dependencies, motion handling and a CSS fallback.',
    intro: 'Shader Background wraps Paper’s React shaders behind a typed variant prop. It provides canvas effects such as mesh gradients, grain, waves and dot patterns for a decorative layer behind ordinary React content.',
    useCase: 'Use a restrained mesh gradient behind a product hero. Keep the heading and button in the DOM above the canvas, with a plain CSS background that remains useful when the shader cannot render.',
    setup: 'Add ShaderBackground and its cn utility from the Code tab. Install the listed @paper-design/shaders-react and motion dependencies. Match each variant’s props to the installed Paper shader version.',
    example: {
      title: 'A shader hero with content above the canvas',
      code: `"use client";

import { ShaderBackground } from "@/components/motion/shader-background";

export function ShaderHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-slate-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ShaderBackground
          variant="mesh-gradient"
          colors={["#16213e", "#315b77", "#486c70", "#202947"]}
          distortion={0.6}
          swirl={0.3}
          speed={0.3}
        />
      </div>
      <div className="relative bg-slate-950/50 px-6 py-20">
        <h2 className="text-3xl font-semibold">A calmer place to build</h2>
        <a className="mt-6 inline-block underline" href="#features">Explore features</a>
      </div>
    </section>
  );
}`,
      explanation: 'The section has real height from its content, so the absolute canvas can fill it. The dark base and translucent content layer help preserve contrast; test it across the moving palette.',
    },
    controls: [
      { name: 'variant', description: 'This imported wrapper contains 21 variants, including mesh-gradient, grain-gradient, waves, water, dot-grid, static-mesh-gradient and static-radial-gradient. Some are static patterns rather than animations.' },
      { name: 'Variant-specific props', description: 'The mesh example’s colors, distortion, swirl and speed are verified in the imported preview. Other variants have different prop types; do not pass the mesh settings to every shader.' },
      { name: 'speed / className', description: 'Pass speed explicitly for variants that support it. When reduced motion is requested, this wrapper freezes speed only when the prop is present. className defaults to filling the parent.' },
    ],
    considerations: [
      'A shader is a graphics dependency, not a CSS-only gradient. Test GPU cost and rendering on the mobile devices and browsers you support; avoid mounting many animated canvases at once.',
      'Keep text, links and controls outside the canvas. A solid or CSS gradient base is a fallback, but it does not by itself recover from a JavaScript error; use your app’s error boundary if the renderer can throw.',
      'The full preview contains a shader selector; the Compact preview is a smaller presentation. Those previews do not turn variant into a free-form shader editor or supply an image-generation API.',
    ],
    source: { name: 'beUI', url: 'https://beui.dev/components/motion/shader-background' },
    relatedSlugs: ['magicui-warp-background', 'magicui-retro-grid', 'magicui-progressive-blur'],
  },
  marquee: {
    displayName: 'Marquee with Pause on Hover',
    title: 'React Marquee with Pause on Hover & Logo Example | Rendyn',
    description: 'Build a React logo marquee with horizontal or vertical scrolling, pause on hover, spacing and fades. Compare its API with the other marquee variants.',
    intro: 'The beUI React marquee repeats a row or column of children in a continuous CSS loop. Pause on hover is enabled by default, making it a useful starting point for a small logo or testimonial strip.',
    useCase: 'Use text labels or logos for secondary social proof below a hero. Keep the same information available as ordinary content if motion would prevent someone from reading it.',
    setup: 'Add Marquee and cn from the Code tab. This source relies on the animate-marquee and animate-marquee-vertical utilities from the shared stylesheet. For Tailwind CSS 4, add the CSS below to your global stylesheet.',
    example: {
      title: 'A slow logo strip with a static reduced-motion list',
      code: `import { Marquee } from "@/components/motion/marquee";

const tools = ["GitHub", "Linear", "Figma", "Notion"];

export function ToolStrip() {
  return (
    <section aria-label="Example tools">
      <div className="motion-reduce:hidden">
        <Marquee speed={35} direction="left" gap="2rem" pauseOnHover fade={false}>
          {tools.map((tool) => <span key={tool}>{tool}</span>)}
        </Marquee>
      </div>
      <ul className="hidden flex-wrap gap-8 motion-reduce:flex">
        {tools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
    </section>
  );
}`,
      css: `@theme {
  --animate-marquee: marquee 30s linear infinite;
  --animate-marquee-vertical: marquee-vertical 30s linear infinite;
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% - var(--gap, 1rem))); }
  }
  @keyframes marquee-vertical {
    from { transform: translateY(0); }
    to { transform: translateY(calc(-100% - var(--gap, 1rem))); }
  }
}`,
      explanation: 'Here speed=35 means a 35-second cycle, so larger values make it slower. The static list is shown when reduced motion is requested; this component does not read the preference itself.',
    },
    controls: [
      { name: 'direction / speed', description: 'Direction supports left, right, up and down. Speed is the cycle duration in seconds, not pixels per second. A vertical strip needs a bounded container height.' },
      { name: 'pauseOnHover / gap / fade', description: 'Hover pause defaults to true, gap to 1rem and edge fading to true. Disable fades when they obscure important text or clip small logos.' },
      { name: 'Children', description: 'The source duplicates the track once and marks the second copy aria-hidden and inert. It accepts static React children, without an items or drag-handler API.' },
    ],
    considerations: [
      'Hover pause does not supply a persistent pause button for touch or keyboard users. Add an accessible pause mechanism or use a static list when continuous movement needs to stop.',
      'Use short, nonessential content. A scrolling strip is a poor home for pricing, navigation or instructions someone must act on.',
      'For repeat and CSS duration controls, compare the Magic UI variant. For react-fast-marquee props and composable edge fades, compare the Kibo UI variant below. Their speed settings are not interchangeable.',
    ],
    source: { name: 'beUI', url: 'https://beui.dev/components/motion/marquee' },
    relatedSlugs: ['magicui-marquee', 'kibo-marquee', 'text-animation'],
  },
  'magicui-marquee': {
    displayName: 'Infinite Media Marquee',
    title: 'Infinite React Media Marquee & Repeat Controls | Rendyn',
    description: 'Explore the Magic UI React marquee for repeating text or media. See repeat, reverse, vertical motion and CSS duration controls with a minimal example.',
    intro: 'The Magic UI marquee repeats React children in horizontal or vertical CSS tracks. It differs from the beUI version by exposing repeat and reverse props and configuring timing through a CSS variable.',
    useCase: 'A repeated strip of decorative media or short labels can fill a wide landing-page section. Use this variant when you want to tune the number of repeated tracks as well as their direction.',
    setup: 'Add the Magic UI Marquee component, cn utility and marquee.css from the Code tab. The CSS file defines its horizontal and vertical animation utilities for Tailwind.',
    example: {
      title: 'Tune a repeated media strip with CSS variables',
      code: `import { Marquee } from "@/components/magicui/marquee";
import "@/components/magicui/marquee.css";

const labels = ["Design", "Review", "Ship"];

export function WorkflowStrip() {
  return (
    <section aria-label="Workflow">
      <p className="sr-only motion-reduce:not-sr-only">Design, review, ship.</p>
      <Marquee
        aria-hidden="true"
        pauseOnHover
        repeat={3}
        reverse
        className="[--duration:35s] [--gap:2rem] motion-reduce:hidden"
      >
        {labels.map((label) => <span key={label}>{label}</span>)}
      </Marquee>
    </section>
  );
}`,
      explanation: 'The source repeats the complete child list three times here. It does not hide repeated tracks from assistive technology, so this decorative example hides the whole animated strip and supplies one readable alternative.',
    },
    controls: [
      { name: 'repeat / reverse / vertical', description: 'Repeat defaults to four tracks; use a small positive integer. Reverse changes direction. Vertical switches to a column animation, which needs a container height.' },
      { name: 'pauseOnHover', description: 'Unlike the beUI marquee, this variant defaults hover pause to false. Enable it explicitly when readers need to inspect moving content.' },
      { name: '--duration / --gap', description: 'Set timing and spacing through CSS variables, such as [--duration:35s] and [--gap:2rem]. This variant has no numeric speed prop.' },
    ],
    considerations: [
      'Repeated interactive children create repeated links and focus stops. Keep this example decorative or adapt the source so duplicated tracks are hidden and inert before using interactive content.',
      'Add a persistent pause control for continuous motion when needed. Hover pause and a reduced-motion alternative serve different needs.',
      'Keep this variant on its existing public URL. The other marquee pages use different prop contracts, even though all three share the same display name.',
    ],
    source: { name: 'Magic UI', url: 'https://magicui.design/docs/components/marquee' },
    relatedSlugs: ['marquee', 'kibo-marquee', 'magicui-orbiting-circles'],
  },
  'kibo-marquee': {
    displayName: 'React Fast Marquee',
    title: 'React Fast Marquee with Kibo UI Composition | Rendyn',
    description: 'Compose a React marquee with Kibo UI and react-fast-marquee. See MarqueeContent, pixel-per-second speed, optional fades and differences from CSS marquees.',
    intro: 'The Kibo UI marquee composes a wrapper, scrolling content, items and optional edge fades around react-fast-marquee. This imported version scrolls items; it does not implement drag-and-drop or item reordering.',
    useCase: 'Choose it for a horizontal logo strip when your project already uses react-fast-marquee and you want separate components for spacing and left/right fades.',
    setup: 'Add the Kibo UI source and cn utility from the Code tab, and install react-fast-marquee. Put animation props on MarqueeContent; Marquee itself is the outer div wrapper.',
    example: {
      title: 'Compose scrolling items and optional edge fades',
      code: `"use client";

import {
  Marquee, MarqueeContent, MarqueeFade, MarqueeItem,
} from "@/components/kibo-ui/marquee";

const tools = ["GitHub", "Linear", "Figma"];

export function ComposedToolStrip() {
  return (
    <section aria-label="Example tools">
      <p className="sr-only motion-reduce:not-sr-only">GitHub, Linear and Figma.</p>
      <Marquee aria-hidden="true" className="motion-reduce:hidden">
        <MarqueeContent speed={30} pauseOnHover autoFill>
          {tools.map((tool) => <MarqueeItem key={tool}>{tool}</MarqueeItem>)}
        </MarqueeContent>
        <MarqueeFade side="left" className="pointer-events-none" />
        <MarqueeFade side="right" className="pointer-events-none" />
      </Marquee>
    </section>
  );
}`,
      explanation: 'MarqueeContent forwards the dependency’s animation props. Its speed is pixels per second, so increasing it moves content faster—the opposite of the beUI marquee’s duration setting.',
    },
    controls: [
      { name: 'MarqueeContent', description: 'Extends react-fast-marquee props. The wrapper defaults autoFill and pauseOnHover to true and loop to zero for continuous scrolling.' },
      { name: 'speed / play / direction', description: 'These belong on MarqueeContent. Speed is pixels per second, play controls whether the track runs, and direction comes from the dependency’s API.' },
      { name: 'MarqueeItem / MarqueeFade', description: 'Items supply horizontal spacing. Fade takes side="left" or side="right". Omit the fades for a fully visible edge, or make them pointer-events-none as shown.' },
    ],
    considerations: [
      'autoFill can create repeated content. The decorative example supplies one static text alternative; avoid repeated interactive links without checking the dependency’s focus behaviour.',
      'Use play with an accessible pause button if users need to stop the strip. Add your own reduced-motion handling; this wrapper does not read the preference.',
      'For draggable work items, use the Kanban component instead. The upstream prose mentions drag interactions, but those are absent from the shipped marquee source.',
    ],
    source: { name: 'Kibo UI', url: 'https://www.kibo-ui.com/components/marquee' },
    relatedSlugs: ['marquee', 'magicui-marquee', 'kibo-kanban'],
  },
  'kibo-kanban': {
    title: 'React Kanban Board & Controlled State Example | Rendyn',
    description: 'Build a React Kanban board with typed cards, columns and drag updates. See controlled state, Kibo UI dependencies and the boundary with persistence.',
    intro: 'Kanban supplies React columns and draggable cards for a project or task board. The Kibo UI source uses dnd-kit for mouse, touch and keyboard sensors, while your application owns the card data and persistence.',
    useCase: 'A small project board can show tasks in Backlog, In progress and Done. Store the status on each card, then render cards through the column they belong to.',
    setup: 'Add the Kibo UI source with its card, scroll-area and cn dependencies from the Code tab. Install the listed dnd-kit packages and tunnel-rat. This example manages local state only.',
    example: {
      title: 'A typed project board controlled by React state',
      code: `"use client";

import { useState } from "react";
import {
  KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider,
} from "@/components/kibo-ui/kanban";

type Task = { id: string; name: string; column: string };
const columns = [
  { id: "backlog", name: "Backlog" },
  { id: "active", name: "In progress" },
  { id: "done", name: "Done" },
];
const initialTasks: Task[] = [
  { id: "task-1", name: "Write the brief", column: "backlog" },
  { id: "task-2", name: "Review the layout", column: "active" },
];

export function ProjectBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  return (
    <section aria-label="Project tasks" className="overflow-x-auto">
      <KanbanProvider
        className="min-w-[36rem]"
        columns={columns}
        data={tasks.map((task) => ({ ...task }))}
        onDataChange={(next) => setTasks(next.map((task) => ({ ...task })))}
      >
        {(column) => (
          <KanbanBoard id={column.id} key={column.id}>
            <KanbanHeader>{column.name}</KanbanHeader>
            <KanbanCards id={column.id}>
              {(task: Task) => <KanbanCard key={task.id} {...task} />}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </section>
  );
}`,
      explanation: 'Each card needs a stable id, name and column matching a real column id. This source changes a card’s column during drag-over and shallow-copies the array; the example copies the records on input and output to protect React state objects.',
    },
    controls: [
      { name: 'columns / data / onDataChange', description: 'The provider is controlled. Update your data in onDataChange to reflect a move or reorder. Extra card fields can carry an assignee or due date for custom card contents.' },
      { name: 'KanbanBoard / KanbanCards / KanbanCard', description: 'The board and card-list ids identify a column. Each card id identifies a task. Children let you customise the card; the default card displays its name.' },
      { name: 'onDragStart / onDragOver / onDragEnd', description: 'These are optional event callbacks. Data can change before drag-end, so onDragEnd alone is not a complete persistence strategy.' },
    ],
    considerations: [
      'Local movement does not save anything. Add server authorization, valid status-transition checks, stable ordering and conflict handling before persisting updates; avoid a write for every drag-over event.',
      'Keyboard sensors and announcements are present, but test a complete keyboard and screen-reader journey with your card contents. Provide an explicit move-to-column action when drag interaction is insufficient.',
      'Small screens need a scrollable board or an alternative list. This source does not supply virtualization, collaborative sync, undo or an implemented drag-cancel rollback.',
    ],
    source: { name: 'Kibo UI', url: 'https://www.kibo-ui.com/components/kanban' },
    relatedSlugs: ['kibo-gantt', 'kibo-table', 'kibo-dropzone'],
  },
  'magicui-bento-grid': {
    title: 'React Tailwind Bento Grid & Product Feature Example | Rendyn',
    description: 'Build a React bento grid with Tailwind column spans and feature cards. See responsive layout, required card props and keyboard-accessible link styling.',
    intro: 'Bento Grid is a React product-feature layout with cards of different column spans. The Magic UI source provides the grid and a composed feature card with an icon, background, description and call-to-action link.',
    useCase: 'Use a larger card for your primary capability and smaller cards for supporting features. Keep the DOM reading order meaningful when changing the visual spans.',
    setup: 'Add BentoGrid and BentoCard, their button and cn dependencies, and the listed @radix-ui/react-icons package from the Code tab. Tailwind classes control responsive columns and card spans.',
    example: {
      title: 'A responsive feature grid with a visible call to action',
      code: `import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

function FeatureIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}

export function ProductFeatures() {
  return (
    <BentoGrid className="grid-cols-1 md:grid-cols-3">
      <BentoCard
        name="A clearer workspace"
        description="Bring the next task into focus."
        Icon={FeatureIcon}
        background={<div aria-hidden="true" className="h-28 bg-gradient-to-br from-slate-100 to-slate-200" />}
        href="#workspace"
        cta="Explore the workspace"
        className="col-span-1 md:col-span-2 [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&>div:nth-child(3)]:opacity-100 [&>div:nth-child(3)]:translate-y-0"
      />
      <BentoCard
        name="Review together"
        description="Keep decisions beside the work."
        Icon={FeatureIcon}
        background={<div aria-hidden="true" className="h-28 bg-slate-100" />}
        href="#review"
        cta="Explore reviews"
        className="col-span-1 [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&>div:nth-child(3)]:opacity-100 [&>div:nth-child(3)]:translate-y-0"
      />
    </BentoGrid>
  );
}`,
      explanation: 'The grid defaults to three columns and each card defaults to spanning all three. The example overrides both at small widths. It also keeps the source’s third child—the desktop CTA—visible instead of requiring hover to reveal it.',
    },
    controls: [
      { name: 'BentoGrid className', description: 'The default uses 22rem auto rows, three columns and a gap. Override grid-cols and auto-rows in Tailwind to fit your content rather than relying on a breakpoint preset.' },
      { name: 'BentoCard content', description: 'Supply name, description, Icon, background, href, cta and className. Background is a React node, not an image URL prop or an automatically generated illustration.' },
      { name: 'Card spans / links', description: 'Use responsive col-span classes for the visual layout. Replace the sample fragment href values with real destinations in your application.' },
    ],
    considerations: [
      'The imported desktop CTA is visually hidden until hover but remains focusable. Keep it visible as shown or adapt the source to reveal it on keyboard focus; test touch and keyboard use.',
      'The third-child selector in the example matches this imported source. Recheck it after any structural source update. Add your application’s reduced-motion styles for the card’s hover transitions.',
      'This is a feature-section building block, not a complete website template. Copy the required files and retain their upstream licence notices when adapting it.',
    ],
    source: { name: 'Magic UI', url: 'https://magicui.design/docs/components/bento-grid' },
    relatedSlugs: ['magicui-magic-card', 'magicui-border-beam', 'shader-background'],
  },
};

export function getComponentEditorial(slug: string): ComponentEditorial | undefined {
  return Object.hasOwn(componentEditorial, slug) ? componentEditorial[slug] : undefined;
}
