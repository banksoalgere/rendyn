export interface CollectionItem {
  slug: string;
  purpose: string;
  detail: string;
}

export interface CollectionContent {
  path: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  previewSlug: string;
  previewCaption: string;
  catalogueHref: string;
  catalogueLabel: string;
  groups: { id: string; title: string; description: string; items: CollectionItem[] }[];
  recipes: { title: string; description: string; steps: { slug: string; text: string }[]; boundary: string }[];
  example: { title: string; description: string; code: string; note: string };
  implementation: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
  sources: { label: string; href: string; description: string }[];
  related: { href: string; label: string; description: string };
}

export const agentCollection: CollectionContent = {
  path: '/collections/ai-agent-ui',
  title: 'AI Agent UI Components for React: Chat, Approvals & Tools | Rendyn',
  description: 'Build React agent interfaces with prompt inputs, streaming responses, approval cards, tool permissions, loading states and image-generation UI. Try real previews.',
  heading: 'AI agent UI components for React',
  intro: 'Give people a clear way to ask, follow the work, and decide what happens next. Explore React and TypeScript components for chat, human approval, tool permissions and generated results, grouped by the part of the agent workflow they serve.',
  previewSlug: 'approval-card',
  previewCaption: 'Try Approval Card: a review surface for decisions, questions and requests for changes.',
  catalogueHref: '/components?category=agents',
  catalogueLabel: 'Browse all agent components',
  groups: [
    {
      id: 'conversation',
      title: 'Compose a prompt and follow the response',
      description: 'A useful streaming chat needs more than a text box. Keep the composer predictable, make answers readable as they arrive, and let people read earlier messages without being pulled back to the newest token.',
      items: [
        { slug: 'prompt-input', purpose: 'An AI prompt input with model selection', detail: 'Use an auto-growing composer with prompt actions, keyboard submission, and send or stop states. Connect onSubmit and onStop to your own request lifecycle.' },
        { slug: 'message-bubble', purpose: 'A clear conversational message', detail: 'Choose alignment and visual tone for user and assistant messages. Group related content and reveal longer content without giving every message the same visual weight.' },
        { slug: 'streaming-response', purpose: 'A stable streaming response surface', detail: 'Pass plain text or rendered content, then expose copy, retry, feedback and sources when appropriate. The component renders your response; your backend supplies the stream.' },
        { slug: 'message-scroller', purpose: 'Chat auto-scroll that respects the reader', detail: 'Follow output while the reader stays near the end, release that following behavior when they move away, and use onFollowChange to reflect the reading state.' },
      ],
    },
    {
      id: 'approval',
      title: 'Review decisions and tool permissions',
      description: 'An approval asks whether a proposed result is acceptable. A tool permission asks whether a specific action may run. Show the proposal and its scope before asking for either decision, then display the state your server confirms.',
      items: [
        { slug: 'approval-card', purpose: 'Human-in-the-loop review and questions', detail: 'Present a draft with approve, reject or request-changes actions. The same surface supports single-choice, multiple-choice and custom answers when the agent needs a decision.' },
        { slug: 'tool-approval', purpose: 'Allow once, remember access, or deny', detail: 'Show the tool and its parameters before execution. Wire onApprove, onAlwaysAllow and onDeny to explicit server policies; a remembered choice needs a defined scope.' },
        { slug: 'file-diff', purpose: 'Inspect the actual proposed file changes', detail: 'Put added and removed lines beside the decision, with syntax highlighting and change counts. Keep the reviewed revision tied to the action that is eventually executed.' },
        { slug: 'tool-result', purpose: 'Readable tool output after execution', detail: 'Expose terminal output or request responses in an expandable disclosure, then collapse completed work into a compact result. Only show completion after your executor reports it.' },
      ],
    },
    {
      id: 'progress',
      title: 'Show progress, sources and generated images',
      description: 'Long-running work should have an understandable state. Separate a loading cue from observed activity, and give generated media a stable place in the conversation before the final asset arrives.',
      items: [
        { slug: 'agent-activity', purpose: 'An agent activity and tool-call timeline', detail: 'Render searches, tool calls and execution traces in one chronological stream. Feed it observed events so people can distinguish ongoing work from a completed step.' },
        { slug: 'loading-states', purpose: 'AI loading states for different waits', detail: 'Choose a short shimmer message, elapsed-time progress, or cycling status phrases. Use wording grounded in real work rather than inventing a percentage or an internal reasoning trace.' },
        { slug: 'image-generation', purpose: 'React image-generation UI with stable layout', detail: 'Reserve an aspect ratio through queued, generating, refining, complete and error states. Supply your generated image as children and connect retry to your own generation service.' },
        { slug: 'citations', purpose: 'Sources beside the answer they support', detail: 'Pair inline citation markers with a collapsible reference list. Provide source data from your application and validate external URLs before passing them into the UI.' },
      ],
    },
  ],
  recipes: [
    {
      title: 'A publishing assistant that waits for review',
      description: 'Let an editor inspect a drafted announcement and its intended destination before publishing. Keep content review and tool execution visible as separate decisions.',
      steps: [
        { slug: 'approval-card', text: 'Show the full draft and destination, then offer approval, rejection or a request for changes.' },
        { slug: 'tool-approval', text: 'When publishing requires a permission, show the named tool and exact parameters for that action.' },
        { slug: 'tool-result', text: 'Display the confirmed execution result, or retain a retryable error if publishing fails.' },
      ],
      boundary: 'Persist approval on the server and bind it to the reviewed action. A card click alone does not authorize execution or prove the announcement was published.',
    },
    {
      title: 'A research chat with readable streaming answers',
      description: 'Keep the input available while a research answer arrives, expose sources after the response, and let a reader scroll back to an earlier passage.',
      steps: [
        { slug: 'prompt-input', text: 'Submit the research question and chosen model; connect the stop action to request cancellation.' },
        { slug: 'message-scroller', text: 'Follow the live edge while the reader is there, then let them move freely through the transcript.' },
        { slug: 'streaming-response', text: 'Render the growing answer, its completed sources and any retry or feedback controls.' },
      ],
      boundary: 'Your application owns transport, history and content sanitization. Choose which surrounding region announces updates so screen readers do not hear the same stream twice.',
    },
    {
      title: 'An image-generation workspace',
      description: 'Give an image request a predictable lifecycle, from its prompt through the wait to an asset the user can inspect. Keep the canvas dimensions stable across states.',
      steps: [
        { slug: 'prompt-input', text: 'Collect the prompt and expose the generation options your service actually accepts.' },
        { slug: 'image-generation', text: 'Reserve the result area, reflect server-reported status and show the final image with meaningful alternative text.' },
        { slug: 'agent-activity', text: 'Show real preparation or generation events if your backend provides them, and surface errors with a recovery action.' },
      ],
      boundary: 'The components supply the interface. You provide the image model or API, credentials, validated inputs and asset storage.',
    },
  ],
  example: {
    title: 'Compose a reader-aware streaming response',
    description: 'This small display layer uses the catalogue APIs directly. Feed it the text and status from your existing chat transport after adding the component source and its listed dependencies.',
    code: `"use client";

import { MessageScroller } from "@/components/agents/message-scroller";
import { StreamingResponse } from "@/components/agents/streaming-response";

export function Answer({ text, status }: {
  text: string;
  status: "streaming" | "complete" | "error";
}) {
  return (
    <MessageScroller
      label="Research conversation"
      busy={status === "streaming"}
      className="h-[28rem]"
    >
      <StreamingResponse
        status={status}
        copyText={text}
        announce={false}
      >
        {text}
      </StreamingResponse>
    </MessageScroller>
  );
}`,
    note: 'Plain text is rendered safely as React content here. If you add Markdown or rich HTML, configure a safe renderer. The example supplies no model, network transport or persisted chat history.',
  },
  implementation: [
    { title: 'Use server-confirmed states', text: 'Map your runtime events to each component’s supported states. Keep pending, approved, running, complete and error distinct where the component supports them; do not turn an optimistic click into a completed result.' },
    { title: 'Connect permissions to your backend', text: 'Validate the actor, tool, parameters and resource on the server. Record what was approved, handle expiry, and request another decision if the action changes. Define the scope of remembered access in your application.' },
    { title: 'Start with one conversation surface', text: 'For a broader reference, inspect Chat App, which composes messages, approvals, tools and generated media. Reuse only the pieces your product needs; its preview is a UI example rather than a hosted agent backend.' },
  ],
  questions: [
    { question: 'Are these a complete AI agent framework?', answer: 'They are React interface components. You connect your own model provider, agent runtime, authentication, persistence and tool execution. They can form the presentation layer around an existing backend.' },
    { question: 'Can I use them with a streaming chat backend?', answer: 'Yes. Pass the content and supported status into the response components, and connect composer callbacks to your transport. Rendyn does not require a particular model provider; check the component source and dependencies against your existing app.' },
    { question: 'What is the difference between Approval Card and Tool Approval?', answer: 'Approval Card supports reviewing an outcome or answering questions. Tool Approval is focused on the tool, its parameters and permission choices. Both need your server to validate and persist the decision before any protected action runs.' },
    { question: 'How do I try components and get their source?', answer: 'Open a component page to use its live preview and inspect its documentation, dependencies and upstream attribution. Source access follows the catalogue’s account and plan rules; see Pricing for current access options.' },
  ],
  sources: [
    { label: 'assistant-ui: Tool UI', href: 'https://www.assistant-ui.com/docs/tools/tool-ui', description: 'Runtime-backed approval and human input patterns for React tool interfaces.' },
    { label: 'AI Elements: Prompt Input', href: 'https://elements.ai-sdk.dev/components/prompt-input', description: 'A reference for composer and model-input responsibilities.' },
    { label: 'AI Elements: Image', href: 'https://elements.ai-sdk.dev/components/image', description: 'An example separating generated-image display from the generation backend.' },
    { label: 'AI Elements: Shimmer', href: 'https://elements.ai-sdk.dev/components/shimmer', description: 'Loading presentation as a separate interface concern.' },
  ],
  related: { href: '/collections/animated-react-components', label: 'Animated React components', description: 'Choose text reveals, hover feedback and transitions for the rest of your product.' },
};

export const animatedCollection: CollectionContent = {
  path: '/collections/animated-react-components',
  title: 'Animated React Components: Text, Cards & Transitions | Rendyn',
  description: 'Explore animated React components for text reveals, hover cards, tabs, modals, marquees and integration visuals. Compare real previews and plan reduced-motion behavior.',
  heading: 'Animated React components with a purpose',
  intro: 'Choose motion for the job it does: introduce a heading, acknowledge an action, connect changing views, or explain an integration. Explore React and TypeScript components with real previews, source details and practical starting points for your interface.',
  previewSlug: 'magicui-orbiting-circles',
  previewCaption: 'Try Orbiting Circles: an animated visual for an integration or partner section.',
  catalogueHref: '/components?category=motion',
  catalogueLabel: 'Browse interaction components',
  groups: [
    {
      id: 'text',
      title: 'Text reveals and animated headings',
      description: 'Use a reveal to establish hierarchy or introduce a short message. Keep the final words readable, and avoid replaying an entrance every time someone scrolls back to the heading.',
      items: [
        { slug: 'text-animation', purpose: 'A family of React text effects', detail: 'Explore spring reveals, chromatic sweeps, shimmer, letter-cascade swaps and character scrambles. Pick the primitive that matches a heading, status label or changing phrase.' },
        { slug: 'magicui-text-animate', purpose: 'Reveal words, characters or lines', detail: 'Choose an animation preset, segment the text, set timing and use once for a single entrance. Preserve its accessible text representation when adapting the effect.' },
        { slug: 'magicui-typing-animation', purpose: 'A short typewriter-style message', detail: 'Introduce a brief phrase with a typing treatment. Keep essential product copy available in a static form rather than making users wait through a long sequence.' },
      ],
    },
    {
      id: 'feedback',
      title: 'Hover cards and action feedback',
      description: 'Motion can show that a surface is interactive or acknowledge a meaningful result. Pointer effects still need a useful touch experience, keyboard focus and a clear action label.',
      items: [
        { slug: 'tilt-card', purpose: 'A React card with cursor-tracked depth', detail: 'Tune max tilt and glare for a featured card. The catalogue source gates decorative tracking on hover capability and reduced-motion preference; retain that behavior.' },
        { slug: 'magicui-interactive-hover-button', purpose: 'An animated hover treatment for a button', detail: 'Give a prominent action a moving label and background treatment. Use a real button action or navigation link and test its focus and disabled states in your app.' },
        { slug: 'magicui-confetti', purpose: 'Celebrate a confirmed milestone', detail: 'Trigger a short confetti effect after an actual success such as finishing onboarding. Avoid repeated bursts, and offer a quiet outcome for people who request less motion.' },
      ],
    },
    {
      id: 'transitions',
      title: 'Tabs, modals and scroll transitions',
      description: 'Use a transition to help people understand what changed. Keep view state, focus management and navigation working even when movement is disabled.',
      items: [
        { slug: 'morphing-tabs', purpose: 'Reorderable tabs with a moving active surface', detail: 'Use the shared shape to connect selection and content changes. Check the preview’s ordering behavior and keep each tab’s meaning clear after reordering.' },
        { slug: 'morphing-modal', purpose: 'One modal panel for a multi-view flow', detail: 'Drive viewId to change the visible view and set it to null to close. The height morph and content cross-fade can connect settings or review steps within one panel.' },
        { slug: 'scroll-animation', purpose: 'Scroll reveal, parallax and reading progress', detail: 'Inspect the separate reveal and progress primitives before adding smooth scrolling. Keep native scrolling where it serves the page better, particularly on touch devices.' },
      ],
    },
    {
      id: 'integrations',
      title: 'Marquees and integration visuals',
      description: 'Looping visuals can make a partner strip or connection diagram memorable. Reserve their space, keep labels readable, and provide a still alternative for continuous movement.',
      items: [
        { slug: 'marquee', purpose: 'A logo or testimonial strip with pause on hover', detail: 'Choose horizontal or vertical direction, speed and spacing. This variant pauses on hover; add a keyboard-operable pause when the product needs one.' },
        { slug: 'magicui-orbiting-circles', purpose: 'Orbiting integration logos', detail: 'Tune radius, icon size, speed and direction to the available space. Fit the largest orbit inside the smallest viewport and keep a static list of the integration names.' },
        { slug: 'magicui-animated-beam', purpose: 'Animated connections between product nodes', detail: 'Show the relationship between named services or steps with a moving beam. Treat it as an illustration unless your app supplies real execution state.' },
      ],
    },
  ],
  recipes: [
    {
      title: 'A landing page with a calm introduction',
      description: 'Reveal a short headline once, introduce the feature cards, and keep the visitor’s path to the product clear.',
      steps: [
        { slug: 'magicui-text-animate', text: 'Reveal the heading by word, using the same semantic heading element as the static version.' },
        { slug: 'tilt-card', text: 'Add restrained hover depth to a featured card while preserving the touch and reduced-motion fallbacks.' },
        { slug: 'magicui-animated-beam', text: 'Explain a connection between labelled services in a separate integration illustration.' },
      ],
      boundary: 'Keep the heading and call to action visible without animation. Load decorative effects after the page’s essential content and inspect actual rendering on a small device.',
    },
    {
      title: 'A settings flow that preserves context',
      description: 'Help users move between related settings and a review step without changing the whole page’s visual structure.',
      steps: [
        { slug: 'morphing-tabs', text: 'Use a moving selection surface to connect related panels.' },
        { slug: 'morphing-modal', text: 'Present the review views in one controlled panel and close it through your application state.' },
        { slug: 'magicui-confetti', text: 'If the milestone warrants it, show one short celebration after the save is confirmed.' },
      ],
      boundary: 'Animation does not save data or make a dialog accessible by itself. Test focus entry, Escape, focus return, keyboard navigation and the error path against your actual implementation.',
    },
    {
      title: 'A partner section that remains readable',
      description: 'Choose a visual based on the relationship you want to explain, and keep the same information available without continuous motion.',
      steps: [
        { slug: 'marquee', text: 'Use a scrolling strip for a flat list of partners or short testimonials.' },
        { slug: 'magicui-orbiting-circles', text: 'Use an orbit when you want to show several services around one central product.' },
        { slug: 'magicui-animated-beam', text: 'Use a beam diagram when connections between particular nodes matter.' },
      ],
      boundary: 'These are alternative layouts, not a requirement to combine three loops. Give automatic movement a suitable pause or static alternative, and keep names available to assistive technology.',
    },
  ],
  example: {
    title: 'Give an animated heading a still alternative',
    description: 'After adding Text Animate and its listed dependencies, use the installed Motion hook to choose a plain heading when reduced motion is requested.',
    code: `"use client";

import { useReducedMotion } from "motion/react";
import { TextAnimate } from "@/components/magicui/text-animate";

export function FeatureHeading() {
  const reduceMotion = useReducedMotion();
  const title = "A clearer view of your work";

  if (reduceMotion !== false) {
    return <h2>{title}</h2>;
  }

  return (
    <TextAnimate as="h2" animation="fadeIn" by="word" once>
      {title}
    </TextAnimate>
  );
}`,
    note: 'Keep the same typography and spacing on both branches. This pattern handles the heading; inspect CSS keyframes, canvas effects and looping decorations separately because a Motion setting does not control every animation technology.',
  },
  implementation: [
    { title: 'Check the source and its dependencies', text: 'The collection includes different implementations: Motion, CSS animations, and an effect such as canvas confetti. Open the component page to inspect its source bundle and dependencies rather than assuming every example shares one runtime or API.' },
    { title: 'Design the reduced-motion result', text: 'Choose what remains when transforms, parallax or loops are removed. Motion provides reduced-motion tools, but CSS and canvas need their own handling. A still layout should preserve the same content and usable controls.' },
    { title: 'Control automatic and repeated movement', text: 'For moving content that starts automatically, lasts over five seconds and appears alongside other content, WCAG calls for a pause, stop or hide mechanism unless the movement is essential. A hover pause alone does not cover keyboard or touch use.' },
  ],
  questions: [
    { question: 'Which animated React component should I start with?', answer: 'Choose the interaction first. Use a text reveal for a brief introduction, hover feedback for a featured action, a view transition for changing content, or a connection visual for an integration. Start with one effect and inspect the page before adding another.' },
    { question: 'Are all these Framer Motion or Motion components?', answer: 'No. Several components use Motion, while others use CSS or canvas-based effects. Each component page lists its dependencies. Follow that source bundle’s installation and import paths instead of assuming one animation package covers the entire collection.' },
    { question: 'Do all components automatically support reduced motion?', answer: 'Support varies by implementation. For example, Tilt Card checks reduced motion and hover capability in its source. Inspect each component, provide a static alternative where needed, and test the installed version with the device preference enabled.' },
    { question: 'How are the marquee variants different?', answer: 'The Marquee linked here is the horizontal or vertical variant with pause on hover. The catalogue also has an infinite media marquee and a composable react-fast-marquee variant with separate content, item and fade parts. Their existing component pages retain their own URLs and interaction details.' },
  ],
  sources: [
    { label: 'Motion: Accessible animations', href: 'https://motion.dev/docs/react-accessibility', description: 'Guidance on reduced-motion settings and adapting React movement.' },
    { label: 'W3C: Pause, Stop, Hide', href: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html', description: 'The conditions for controlling automatic moving content.' },
    { label: 'Magic UI: Component reference', href: 'https://magicui.design/docs/components', description: 'Upstream context for text, orbit, beam and other catalogue effects.' },
  ],
  related: { href: '/collections/ai-agent-ui', label: 'AI agent UI components', description: 'Build a conversation with prompts, streaming responses, approval decisions and tool results.' },
};
