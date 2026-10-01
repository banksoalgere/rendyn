import { describe, expect, it } from 'vitest';
import { literalValues, mantineRuntime } from './source-ast';

describe('static upstream demo adaptation', () => {
  it('renders every documented component with defaults and keeps its helper closure', () => {
    const adapted = mantineRuntime(`import {Button} from '@mantine/core';
import {MantineDemo} from '@mantinex/demo';
const unusedDocumentation = 'not a runtime dependency';
const label = 'Submit';
function Demo(props: any) { return <Button {...props}>{label}</Button>; }
export const basic: MantineDemo = {type:'configurator',component:Demo,controls:[{prop:'disabled',initialValue:false}]};
export const alternate: MantineDemo = {type:'code',component:()=> <Demo disabled />};`);
    expect(adapted).toContain('disabled={false}');
    expect(adapted).toContain('const label');
    expect(adapted).toContain('export function RendynExample2');
    expect(adapted).not.toContain('unusedDocumentation');
    expect(adapted).not.toContain('@mantinex/demo');
  });
  it('retains published picker factory variants without evaluating upstream code', () => {
    const adapted = mantineRuntime(`import {getSharedPickerDemos} from './shared';
import {DatePicker} from '@mantine/dates';
export const {usage,range}=getSharedPickerDemos(DatePicker);
export {other} from './other';`);
    expect(adapted).toContain('Rendyn variant: range');
    expect(adapted).toContain('range.component');
    expect(adapted).not.toContain("from './other'");
  });
  it('does not execute expressions or mutate prototypes while reading metadata', () => {
    const values = literalValues('const config={"__proto__": {polluted:true},name:"demo"}; const unsafe=process.exit();');
    expect(Object.getPrototypeOf(values.get('config'))).toBeNull();
    expect(values.get('unsafe')).toBeUndefined();
    expect(({} as {polluted?:boolean}).polluted).toBeUndefined();
  });
});
