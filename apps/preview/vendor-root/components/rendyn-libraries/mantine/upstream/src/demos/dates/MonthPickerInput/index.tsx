"use client";

import { MonthPickerInput } from '@mantine/dates';
import { getSharedPickerInputDemos } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/index';
export const { usage, multiple, range, configurator, modal, icon, clearable, valueFormatter } =
  getSharedPickerInputDemos(MonthPickerInput);
// Rendyn variant: usage
export function RendynExample() {
  const Render = usage.component;
  const props = Object.fromEntries((usage.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: multiple
export function RendynExample2() {
  const Render = multiple.component;
  const props = Object.fromEntries((multiple.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: range
export function RendynExample3() {
  const Render = range.component;
  const props = Object.fromEntries((range.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: configurator
export function RendynExample4() {
  const Render = configurator.component;
  const props = Object.fromEntries((configurator.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: modal
export function RendynExample5() {
  const Render = modal.component;
  const props = Object.fromEntries((modal.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: icon
export function RendynExample6() {
  const Render = icon.component;
  const props = Object.fromEntries((icon.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: clearable
export function RendynExample7() {
  const Render = clearable.component;
  const props = Object.fromEntries((clearable.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: valueFormatter
export function RendynExample8() {
  const Render = valueFormatter.component;
  const props = Object.fromEntries((valueFormatter.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}