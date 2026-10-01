"use client";

import { DatePicker } from '@mantine/dates';
import { getSharedPickerDemos } from '@/components/rendyn-libraries/mantine/upstream/src/demos/dates/_shared/index';
export const { usage, multiple, deselect, range, singleRange, numberOfColumns, sizeConfigurator } =
  getSharedPickerDemos(DatePicker);
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
// Rendyn variant: deselect
export function RendynExample3() {
  const Render = deselect.component;
  const props = Object.fromEntries((deselect.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: range
export function RendynExample4() {
  const Render = range.component;
  const props = Object.fromEntries((range.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: singleRange
export function RendynExample5() {
  const Render = singleRange.component;
  const props = Object.fromEntries((singleRange.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: numberOfColumns
export function RendynExample6() {
  const Render = numberOfColumns.component;
  const props = Object.fromEntries((numberOfColumns.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}
// Rendyn variant: sizeConfigurator
export function RendynExample7() {
  const Render = sizeConfigurator.component;
  const props = Object.fromEntries((sizeConfigurator.controls ?? []).filter(control => /^[A-Za-z][\w-]*$/.test(control.prop)).map(control => [control.prop, control.initialValue]));
  return <Render {...props} />;
}