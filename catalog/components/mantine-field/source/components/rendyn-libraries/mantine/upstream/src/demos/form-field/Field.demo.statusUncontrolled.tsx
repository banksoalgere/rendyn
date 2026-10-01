"use client";

import { useState } from 'react';

import { Button, Text, TextInput } from '@mantine/core';

import { useField } from '@mantine/form';

function Demo() {
  const field = useField({ mode: 'uncontrolled', initialValue: '' });
  const [fieldStatus, setFieldStatus] = useState({ touched: false, dirty: false });
  const updateStatus = () => {
    setFieldStatus({ touched: field.isTouched(), dirty: field.isDirty() });
  };

  return (
    <>
      <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" mb="md" />

      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus.dirty ? 'red' : 'teal'}>
          {fieldStatus.dirty ? 'dirty' : 'not dirty'}
        </Text>
      </Text>
      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus.touched ? 'red' : 'teal'}>
          {fieldStatus.touched ? 'touched' : 'not touched'}
        </Text>
      </Text>

      <Button onClick={updateStatus} mt="md">
        Update Status
      </Button>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
