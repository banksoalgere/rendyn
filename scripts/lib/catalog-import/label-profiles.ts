import type { CatalogMetadata } from '../../../packages/catalog/src/types.js';

export interface LabelProfile {
  family: string;
  name: string;
  description: string;
  tags: string[];
  aliases: string[];
  kind: CatalogMetadata['kind'];
}

type Definition = [string, string, string, string, string?];

// Purpose labels describe the pattern, rather than claiming every bundled example
// supports an option. Exact upstream variants and behavior come from source evidence.
const definitions: Definition[] = [
  ['accordion', 'Accordion', 'Expand and collapse grouped content such as frequently asked questions.', 'accordion faq content disclosure', 'faq|frequently asked questions'],
  ['alert-dialog', 'Confirmation Dialog', 'Ask for confirmation before completing an important action.', 'dialog confirmation overlay', 'confirmation dialog|confirm action'],
  ['dialog', 'Dialog', 'Display a focused interaction in an overlay above the current page.', 'dialog overlay modal', 'modal|overlay'],
  ['drawer', 'Drawer', 'Open a panel alongside the current page for details or additional controls.', 'drawer panel overlay', 'sheet|side panel'],
  ['combobox', 'Combobox', 'Search and choose a value from a list of available options.', 'combobox search select input', 'searchable select|autocomplete'],
  ['command', 'Command Menu', 'Find commands and actions in a searchable command menu.', 'command menu search navigation', 'command palette|quick actions'],
  ['context-menu', 'Context Menu', 'Show actions associated with the selected item or context.', 'menu context action', 'context menu'],
  ['dropdown-menu', 'Dropdown Menu', 'Open a menu of actions from a trigger control.', 'dropdown menu action', 'action menu'],
  ['navigation', 'Navigation', 'Provide links and controls for moving between pages or sections.', 'navigation menu link', 'navbar|navigation bar'],
  ['sidebar', 'Sidebar', 'Organize application navigation and supporting controls in a side panel.', 'sidebar navigation layout', 'side navigation'],
  ['breadcrumb', 'Breadcrumbs', 'Show the current location within a hierarchy of pages.', 'breadcrumb navigation link', 'breadcrumbs|page hierarchy'],
  ['pagination', 'Pagination', 'Move between pages of a collection of results.', 'pagination navigation data', 'page navigation'],
  ['tabs', 'Tabs', 'Switch between related panels without leaving the current view.', 'tabs navigation panel', 'tabbed interface'],
  ['tree', 'Tree View', 'Explore and select items in a hierarchical collection.', 'tree hierarchy selection data', 'tree view|hierarchical list'],
  ['data-table', 'Data Table', 'Present structured records in rows and columns.', 'table data rows columns', 'data table|tabular data'],
  ['table', 'Table', 'Display related values in a row and column structure.', 'table data rows columns', 'tabular data'],
  ['chart', 'Chart', 'Visualize values, comparisons, or changes in a dataset.', 'chart data visualization', 'data visualization|graph'],
  ['calendar', 'Calendar', 'Display dates in a calendar layout.', 'calendar date schedule', 'calendar view'],
  ['date-picker', 'Date Picker', 'Choose a date or date range from date-selection controls.', 'date picker calendar input', 'date selection'],
  ['time-picker', 'Time Picker', 'Choose or enter a time value.', 'time picker input', 'time selection'],
  ['input-otp', 'Verification Code Input', 'Enter a short verification code across a group of input slots.', 'input otp verification authentication', 'one time password|verification code|pin input'],
  ['password-input', 'Password Input', 'Enter a password in a masked text field.', 'input password authentication', 'password field'],
  ['number-input', 'Number Input', 'Enter a numeric value using a number field.', 'input number form', 'numeric input'],
  ['textarea', 'Text Area', 'Enter text that spans multiple lines.', 'textarea input text form', 'multiline text input'],
  ['input', 'Text Input', 'Enter a value in a text field.', 'input text form', 'text field'],
  ['checkbox', 'Checkbox', 'Choose whether an option is selected.', 'checkbox selection form', 'check box'],
  ['radio', 'Radio Group', 'Choose one option from a set of alternatives.', 'radio selection form', 'radio buttons|single choice'],
  ['switch', 'Switch', 'Turn a setting on or off.', 'switch toggle setting', 'toggle switch|on off setting'],
  ['select', 'Select', 'Choose a value from a list of options.', 'select selection form', 'dropdown selector'],
  ['slider', 'Slider', 'Choose a numeric value or range along a track.', 'slider number range input', 'range control'],
  ['rating', 'Rating', 'Choose or display a rating on a bounded scale.', 'rating selection feedback', 'star rating'],
  ['button', 'Button', 'Trigger an action from a button control.', 'button action control', 'cta|action control'],
  ['toggle', 'Toggle', 'Change the selected state of an option or control.', 'toggle selection control', 'toggle button'],
  ['form', 'Form', 'Collect related values through a group of form controls.', 'form input submission', 'data entry form'],
  ['file-upload', 'File Upload', 'Select files to attach or upload.', 'file upload attachment form', 'file picker|dropzone'],
  ['color-picker', 'Color Picker', 'Choose or inspect a color value.', 'color picker input', 'colour picker|color selection'],
  ['popover', 'Popover', 'Display contextual content beside its trigger.', 'popover overlay context', 'contextual overlay'],
  ['tooltip', 'Tooltip', 'Show a brief explanation associated with a control or item.', 'tooltip help context', 'contextual help'],
  ['hover-card', 'Hover Card', 'Preview supporting content alongside a trigger.', 'card hover preview context', 'content preview'],
  ['alert', 'Alert', 'Display important information, warnings, or errors within the page.', 'alert feedback notification', 'inline alert|warning message'],
  ['toast', 'Toast Notification', 'Display a transient notification about an event or action.', 'toast notification feedback', 'toast|snackbar'],
  ['progress', 'Progress Indicator', 'Show how far a task has progressed.', 'progress status feedback', 'task progress'],
  ['loader', 'Loading Indicator', 'Indicate that content or a task is still loading.', 'loading loader status', 'spinner|loading state'],
  ['skeleton', 'Skeleton Placeholder', 'Reserve the shape of content while it is loading.', 'skeleton loading placeholder', 'loading placeholder'],
  ['empty-state', 'Empty State', 'Explain why content is absent and provide relevant next steps.', 'empty state feedback', 'empty results|no content'],
  ['error-page', 'Not Found Page', 'Explain that the requested page or resource could not be found.', 'error page not-found', '404|not found page|missing page'],
  ['avatar', 'Avatar', 'Represent a person or account with an image or initials.', 'avatar user identity', 'profile image'],
  ['badge', 'Badge', 'Display a compact label, count, or status alongside content.', 'badge status label', 'chip|tag|status label'],
  ['card', 'Card', 'Group related content and actions in a distinct container.', 'card content container', 'content card'],
  ['list', 'List', 'Present a collection of related items.', 'list collection content', 'item list'],
  ['carousel', 'Carousel', 'Move through a sequence of content items.', 'carousel content navigation', 'image slider|content carousel'],
  ['code', 'Code Block', 'Display code or a technical snippet.', 'code text snippet', 'code snippet'],
  ['typography', 'Typography', 'Present text with an appropriate hierarchy and emphasis.', 'text typography content', 'text styling'],
  ['layout', 'Layout', 'Arrange and align interface content.', 'layout alignment container', 'content layout'],
  ['separator', 'Separator', 'Visually separate related areas of an interface.', 'separator layout divider', 'divider'],
  ['resizable', 'Resizable Panels', 'Let users adjust the space assigned to adjacent panels.', 'resizable layout panel', 'splitter|split pane'],
  ['scroll-area', 'Scroll Area', 'Present content within a scrollable region.', 'scroll content container', 'scrollable region'],
  ['disclosure', 'Disclosure', 'Reveal or hide a section of supporting content.', 'disclosure content collapse', 'collapsible section'],
  ['image', 'Image', 'Display an image or collection of images.', 'image media content', 'image display'],
  ['lightbox', 'Lightbox', 'Inspect media in an enlarged overlay.', 'image media overlay', 'media viewer'],
  ['clipboard', 'Copy Control', 'Copy a selected value or snippet to the clipboard.', 'clipboard copy action', 'copy button'],
  ['qr-code', 'QR Code', 'Display a value in a scannable QR code.', 'qr-code data display', 'qr code'],
  ['keyboard-hint', 'Keyboard Shortcut', 'Display a key or keyboard shortcut hint.', 'keyboard shortcut help', 'kbd|key hint'],
  ['stepper', 'Stepper', 'Show the current stage within a sequence of steps.', 'stepper steps progress', 'step indicator'],
  ['timeline', 'Timeline', 'Display events or milestones in sequence.', 'timeline history event', 'event timeline'],
  ['statistic', 'Statistic', 'Display a key metric or numeric summary.', 'statistic metric data', 'stat|metric|kpi'],
  ['tour', 'Product Tour', 'Guide users through a sequence of interface features.', 'tour onboarding guidance', 'guided tour'],
  ['schedule', 'Schedule', 'Display appointments or resources in a time-based layout.', 'schedule calendar time', 'agenda|appointment schedule'],
  ['editor', 'Rich Text Editor', 'Compose and edit formatted text.', 'editor text input', 'rich text editor'],
  ['theme', 'Theme Configuration', 'Configure or demonstrate shared interface theme values.', 'theme utility configuration', 'theming'],
  ['accessibility', 'Accessibility Utility', 'Support focus management or accessible presentation.', 'accessibility utility focus', 'accessible interface'],
  ['label', 'Form Label', 'Identify a control or describe the value it accepts.', 'label form text', 'field label'],
  ['link', 'Link', 'Navigate to a page or resource using a link.', 'link navigation action', 'hyperlink'],
  ['icon', 'Icon', 'Represent an interface concept with a compact symbol.', 'icon symbol display', 'interface icon'],
  ['banner', 'Announcement Banner', 'Display an announcement or call to action across a page.', 'banner announcement notification', 'announcement bar'],
  ['cropper', 'Image Cropper', 'Choose the area of an image to keep.', 'image crop media edit', 'image cropping'],
  ['segmented-control', 'Segmented Control', 'Choose between options presented in a compact group.', 'segmented selection control', 'segmented selector'],
  ['transfer', 'Transfer List', 'Move selected items between two collections.', 'transfer list selection', 'dual list selector'],
  ['overlay', 'Overlay', 'Place a visual layer above the underlying interface.', 'overlay layer', 'backdrop'],
  ['animation', 'Animation', 'Demonstrate a motion or transition treatment.', 'animation motion transition', 'transition effect'],
  ['marquee', 'Marquee', 'Move a repeating sequence of content across a region.', 'marquee motion content', 'scrolling marquee'],
  ['editable', 'Editable Text', 'Edit a text value in place.', 'editable text input', 'inline editing'],
  ['mentions', 'Mention Input', 'Insert references to people or items while entering text.', 'mention input text', 'mention autocomplete'],
  ['watermark', 'Watermark', 'Overlay a repeated identifying mark on content.', 'watermark overlay text', 'content watermark'],
  ['result', 'Result State', 'Present the outcome of an action or request.', 'result feedback state', 'success result|error result'],
  ['download', 'Download Control', 'Start downloading a file or resource.', 'download file action', 'download trigger'],
  ['gallery', 'Component Gallery', 'Compare a collection of interface components or examples.', 'gallery example collection', 'component showcase'],
  ['toolbar', 'Toolbar', 'Group actions and controls for the current view or selection.', 'toolbar action control', 'action bar'],
  ['billing-period', 'Billing Period Toggle', 'Switch between monthly and yearly billing periods.', 'billing period toggle selection', 'billing frequency|monthly yearly toggle'],
  ['utility', 'Interface Utility', 'Demonstrate a supporting interface utility.', 'utility example', 'supporting utility'],
];

export const labelProfiles = new Map<string, LabelProfile>(definitions.map(([family, name, description, tags, aliases]) => [family, {
  family, name, description, tags: tags.split(' '), aliases: aliases?.split('|') ?? [], kind: 'component',
}]));

const blocks: Definition[] = [
  ['pricing', 'Pricing Plan Selector', 'Compare available plans and choose a pricing tier.', 'pricing plan billing selection', 'pricing tiers|price comparison|plan selector'],
  ['product-panel', 'Product Panel', 'Group related information and controls in a composed interface.', 'panel product content', 'product interface'],
  ['login', 'Login Form', 'Collect the information needed to sign in to an account.', 'login authentication form', 'sign in|authentication'],
  ['signup', 'Signup Form', 'Collect the information needed to create an account.', 'signup authentication form', 'sign up|registration'],
  ['dashboard', 'Dashboard', 'Combine application navigation with information and controls in a dashboard layout.', 'dashboard data layout', 'admin dashboard'],
  ['chat', 'Chat Interface', 'Present a conversation with messages and related controls.', 'chat message conversation', 'chat interface'],
  ['payment', 'Payment Interface', 'Present payment details, balances, or related payment controls.', 'payment billing finance', 'payments|billing'],
  ['settings', 'Settings Panel', 'Group controls for configuring account or application preferences.', 'setting preferences form', 'settings|preferences'],
  ['shipping-address', 'Shipping Address Form', 'Collect delivery address details in a form.', 'shipping address form', 'delivery address'],
  ['feedback-form', 'Feedback Form', 'Collect feedback or a problem report from a user.', 'feedback form submission', 'report bug'],
  ['appointment', 'Appointment Booking', 'Present controls for arranging an appointment.', 'appointment calendar booking', 'book appointment'],
];
for (const [family, name, description, tags, aliases] of blocks) labelProfiles.set(family, {
  family, name, description, tags: tags.split(' '), aliases: aliases?.split('|') ?? [], kind: 'block',
});
