'use client';

import { useState } from 'react';
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from '@/components/motion/popover-morph';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/motion/tabs';

export const componentGroups = [
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

        <Tabs
          className="product-menu__tabs"
          onValueChange={(value) => setActiveGroupId(value as (typeof componentGroups)[number]['id'])}
          value={activeGroup.id}
          variant="segment"
        >
          <TabsList className="product-menu__tabs-list">
            {componentGroups.map((group) => {
              const active = group.id === activeGroup.id;
              return (
                <TabsTrigger
                  className="product-menu__tab"
                  indicatorClassName="product-menu__tab-indicator"
                  key={group.id}
                  value={group.id}
                >
                  <span>{group.label}</span>
                  <b data-active={active ? 'true' : 'false'}>{group.components.length}</b>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {componentGroups.map((group) => (
            <TabsContent className="product-menu__results" key={group.id} value={group.id}>
              <div className="product-menu__results-heading">
                <div><strong>{group.label}</strong><span>{group.detail}</span></div>
                <small>{group.components.length} components · React · TypeScript · Tailwind</small>
              </div>
              <div className="product-menu__grid">
                {group.components.map(([slug, name], index) => (
                  <a href="#components" key={slug} onClick={() => setOpen(false)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{name}</strong>
                    <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <a className="product-menu__footer" href="#components" onClick={() => setOpen(false)}>
          <span><strong>Browse the complete catalogue</strong><small>Preview components and find the right fit</small></span>
          <b aria-hidden="true">→</b>
        </a>
      </MorphPopoverContent>
    </MorphPopover>
  );
}
