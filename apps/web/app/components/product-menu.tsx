'use client';

import { useState } from 'react';
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from '@/components/motion/popover-morph';

const componentGroups = [
  {
    id: 'motion',
    label: 'Motion',
    detail: 'Interaction and animation',
    components: [
      ['tilt-card', 'Tilt Card'],
      ['button', 'Button'],
      ['expanding-arrow-button', 'Animated CTA Buttons'],
      ['expandable-control', 'Expandable Control'],
      ['marquee', 'Marquee'],
      ['tabs', 'Tabs'],
      ['switch', 'Switch'],
      ['input', 'Input'],
      ['select', 'Select'],
      ['combobox', 'Combobox'],
      ['multi-select', 'Multi Select'],
      ['checkbox', 'Checkbox'],
      ['radio', 'Radio Group'],
      ['bottom-sheet', 'Bottom Sheet'],
      ['pull-to-refresh', 'Pull to Refresh'],
      ['shared-layout-bg', 'Shared Layout Background'],
      ['bounce-sidebar', 'Bounce Sidebar'],
      ['animated-sidebar', 'Animated Sidebar'],
      ['file-tree', 'File Tree'],
      ['preview-rail', 'Preview Rail'],
      ['dock', 'Dock'],
      ['tooltip', 'Tooltip'],
      ['context-menu', 'Animated Context Menu'],
      ['popover', 'Popover'],
      ['morphing-modal', 'Morphing Modal'],
      ['center-morph-modal', 'Center Morph Modal'],
      ['text-animation', 'Text Animation'],
      ['number', 'Number Animation'],
      ['animated-badge', 'Animated Badge'],
      ['action-swap', 'Action Swap'],
      ['animated-toast-stack', 'Animated Toast Stack'],
      ['theme-toggle', 'Theme Toggle'],
      ['bouncy-accordion', 'Bouncy Accordion'],
      ['drawer', 'Drawer'],
      ['scroll-animation', 'Scroll Animation'],
      ['range-slider', 'Range Slider'],
      ['wheel-picker', 'Wheel Picker'],
      ['table', 'Table'],
      ['shader-background', 'Shader Background'],
      ['cylinder-carousel', 'Cylinder Carousel'],
      ['loader', 'Loader'],
    ],
  },
  {
    id: 'agents',
    label: 'Agent UI',
    detail: 'Interfaces for AI products',
    components: [
      ['message-bubble', 'Message Bubble'],
      ['message', 'Message'],
      ['message-scroller', 'Message Scroller'],
      ['prompt-input', 'Prompt Input'],
      ['todo-list', 'Todo List'],
      ['code-block', 'Code Block'],
      ['approval-card', 'Approval Card'],
      ['file-diff', 'File Diff'],
      ['tool-result', 'Tool Result'],
      ['streaming-response', 'Streaming Response'],
      ['image-generation', 'Image Generation'],
      ['tool-approval', 'Tool Approval'],
      ['citations', 'Citations'],
      ['agent-activity', 'Agent Activity'],
      ['loading-states', 'Agent Loading States'],
      ['ai-sidebar', 'AI Sidebar'],
      ['chat-app', 'Chat App'],
    ],
  },
  {
    id: 'blocks',
    label: 'Product blocks',
    detail: 'Complete product patterns',
    components: [
      ['infinite-masonry', 'Infinite Masonry'],
      ['notification-stack', 'Notification Stack'],
      ['project-folder', 'Project Folder'],
      ['knockout-bracket', 'Knockout Bracket'],
      ['availability-scheduler', 'Availability Scheduler'],
      ['swap', 'Multi-chain Swap'],
      ['dynamic-island', 'Dynamic Island'],
      ['command-palette', 'Command Palette'],
      ['morphing-search', 'Morphing Search'],
      ['expandable-action-bar', 'Expandable Action Bar'],
      ['overflow-actions', 'Overflow Actions'],
      ['expandable-tabs', 'Expandable Tabs'],
      ['morphing-tabs', 'Morphing Tabs'],
      ['swipeable-list', 'Swipeable List'],
      ['file-upload', 'File Upload'],
      ['prediction-market', 'Prediction Market'],
      ['wallet-card', 'Wallet Card'],
      ['otp-input', 'OTP Input'],
      ['signup-form', 'Sign Up Form'],
      ['bloom-menu', 'Bloom Menu'],
      ['feedback-widget', 'Feedback Widget'],
      ['not-found', '404 / Not Found'],
    ],
  },
] as const;

export function ProductMenu() {
  const [open, setOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<(typeof componentGroups)[number]['id']>('motion');
  const activeGroup = componentGroups.find((group) => group.id === activeGroupId) ?? componentGroups[0];

  return (
    <MorphPopover open={open} onOpenChange={setOpen} className="product-menu">
      <MorphPopoverTrigger>
        <button className="product-menu__trigger" type="button">
          Product
          <svg aria-hidden="true" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" /></svg>
        </button>
      </MorphPopoverTrigger>
      <MorphPopoverContent align="start" radius={12} className="product-menu__content">
        <div className="product-menu__heading">
          <span>Component catalogue</span>
          <p>Explore all 80 components by category.</p>
        </div>

        <div className="product-menu__body">
          <div className="product-menu__filters" role="tablist" aria-label="Component categories">
            {componentGroups.map((group) => {
              const active = group.id === activeGroup.id;
              return (
                <button
                  aria-controls={`product-menu-panel-${group.id}`}
                  aria-selected={active}
                  data-active={active ? 'true' : 'false'}
                  id={`product-menu-tab-${group.id}`}
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  role="tab"
                  tabIndex={active ? 0 : -1}
                  type="button"
                >
                  <span><strong>{group.label}</strong><small>{group.detail}</small></span>
                  <b>{group.components.length}</b>
                </button>
              );
            })}
          </div>

          <section
            aria-labelledby={`product-menu-tab-${activeGroup.id}`}
            className="product-menu__results"
            id={`product-menu-panel-${activeGroup.id}`}
            role="tabpanel"
          >
            <div className="product-menu__results-heading">
              <div><strong>{activeGroup.label}</strong><span>{activeGroup.components.length} components</span></div>
              <small>React · TypeScript · Tailwind</small>
            </div>
            <div className="product-menu__grid">
              {activeGroup.components.map(([slug, name], index) => (
                <a href="#components" key={slug} onClick={() => setOpen(false)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{name}</strong>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </section>
        </div>

        <a className="product-menu__footer" href="#components" onClick={() => setOpen(false)}>
          <span><strong>Browse the complete catalogue</strong><small>Preview components and find the right fit</small></span>
          <b aria-hidden="true">→</b>
        </a>
      </MorphPopoverContent>
    </MorphPopover>
  );
}
