"use client";

import { Checkbox, CheckboxProps } from '@mantine/core';
const RendynExampleComponent = (props: CheckboxProps) => <Checkbox {...props} defaultChecked />;
export function RendynExample() { return <RendynExampleComponent labelPosition={"right"} label={"I agree to sell my privacy"} description={""} error={""} color={"blue"} variant={"filled"} radius={"sm"} size={"sm"} disabled={false} indeterminate={false} />; }
