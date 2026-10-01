"use client";

import hljs from 'highlight.js/lib/core';

import {
  CodeHighlight,
  CodeHighlightAdapterProvider,
  createHighlightJsAdapter,
} from '@mantine/code-highlight';

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

const highlightJSAdapter = createHighlightJsAdapter(hljs);

function Demo() {
  return (
    <CodeHighlightAdapterProvider adapter={highlightJSAdapter}>
      <CodeHighlight
        code={exampleCode}
        language="tsx"
        radius="md"
        background="var(--mantine-color-dark-8)"
        codeColorScheme="dark"
      />
    </CodeHighlightAdapterProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
