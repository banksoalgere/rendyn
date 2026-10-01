"use client";

import { BaseDemo } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Accordion/_base';
const RendynExampleComponent = () => <BaseDemo transitionDuration={0} />;
export function RendynExample() { return <RendynExampleComponent  />; }
const RendynExample2Component = () => <BaseDemo transitionDuration={1000} />;
export function RendynExample2() { return <RendynExample2Component  />; }
