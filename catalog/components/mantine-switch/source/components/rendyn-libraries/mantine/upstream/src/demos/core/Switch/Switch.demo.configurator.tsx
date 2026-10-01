"use client";

import { Switch } from '@mantine/core';
const RendynExampleComponent = (props: any) => <Switch defaultChecked {...props} />;
export function RendynExample() { return <RendynExampleComponent color={"blue"} withThumbIndicator={true} labelPosition={"right"} label={"I agree to sell my privacy"} description={""} error={""} size={"sm"} radius={"xl"} disabled={false} />; }
