"use client";

import { TextBIcon, TextItalicIcon } from '@phosphor-icons/react';

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

import { RichTextEditor } from '@mantine/tiptap';

const BoldIcon = () => <TextBIcon size={16} />;

const ItalicIcon = () => <TextItalicIcon size={16} />;

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [StarterKit],
    content: '<p>Customize icons with icon prop</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={BoldIcon} />
          <RichTextEditor.Italic icon={ItalicIcon} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
