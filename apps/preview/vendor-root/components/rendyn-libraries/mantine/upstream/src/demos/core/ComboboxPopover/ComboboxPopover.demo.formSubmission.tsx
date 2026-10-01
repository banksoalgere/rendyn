"use client";

import { useState } from 'react';

import { Button, ComboboxPopover, Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(formData.get('framework') as string);
      }}
    >
      <Stack>
        <ComboboxPopover
          data={['React', 'Angular', 'Vue', 'Svelte']}
          value={value}
          onChange={setValue}
          name="framework"
        >
          <ComboboxPopover.Target>
            <Button variant="default" miw={200} type="button">
              {value || 'Select framework'}
            </Button>
          </ComboboxPopover.Target>
        </ComboboxPopover>

        <Button type="submit">Submit</Button>
        {submitted && (
          <Text size="sm">
            Submitted value: <b>{submitted}</b>
          </Text>
        )}
      </Stack>
    </form>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
