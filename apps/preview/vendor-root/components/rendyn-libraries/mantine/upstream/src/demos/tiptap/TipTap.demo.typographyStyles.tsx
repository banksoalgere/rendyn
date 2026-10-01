"use client";

import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

import { Link, RichTextEditor } from '@mantine/tiptap';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/tiptap/TipTap.demo.typographyStyles.module.css';

function Demo() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ link: false }), Link],
    content: `
    <h2>Heading 2</h2>
    <p>Paragraph with <a href="https://mantine.dev">link</a></p>
    `,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
