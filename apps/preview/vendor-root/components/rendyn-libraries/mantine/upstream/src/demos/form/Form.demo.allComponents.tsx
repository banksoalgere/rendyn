"use client";

import {
  AngleSlider,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  FileInput,
  Group,
  Input,
  JsonInput,
  MaskInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  Radio,
  RangeSlider,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';

import { useForm } from '@mantine/form';

function DemoTextInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoAngleSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      angle: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <AngleSlider aria-label="Angle" key={form.key('angle')} {...form.getInputProps('angle')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoCheckbox() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      termsParams: false,
    },

    validate: {
      termsParams: (value) => (value ? null : 'You must agree to sell your soul'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox
        label="I agree to sell my privacy"
        key={form.key('termsParams')}
        {...form.getInputProps('termsParams', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoCheckboxGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox.Group
        label="Select your favorite frameworks/libraries"
        withAsterisk
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Checkbox value="react" label="React" />
          <Checkbox value="mantine" label="Mantine" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="svelte" label="Svelte" />
        </Group>
      </Checkbox.Group>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoChip() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      awesome: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Chip key={form.key('awesome')} {...form.getInputProps('awesome', { type: 'checkbox' })}>
        Mantine is awesome
      </Chip>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoColorInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <ColorInput
        label="Your favorite color"
        placeholder="Pick color"
        key={form.key('color')}
        {...form.getInputProps('color')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoColorPicker() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '#000000',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Pick color
      </Text>
      <ColorPicker format="hex" key={form.key('color')} {...form.getInputProps('color')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoFieldset() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Fieldset legend="Personal information">
        <TextInput
          label="Name"
          placeholder="Your name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          mt="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
      </Fieldset>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoFileInput() {
  const form = useForm<{ avatar: File | null }>({
    mode: 'uncontrolled',
    initialValues: {
      avatar: null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <FileInput
        label="Avatar"
        placeholder="Upload avatar"
        key={form.key('avatar')}
        {...form.getInputProps('avatar')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Input.Wrapper label="Phone" withAsterisk>
        <Input
          component="input"
          placeholder="Your phone"
          key={form.key('phone')}
          {...form.getInputProps('phone')}
        />
      </Input.Wrapper>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoJsonInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      packageJson: '{"name": "mantine"}',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <JsonInput
        label="package.json"
        placeholder="package.json"
        formatOnBlur
        autosize
        minRows={4}
        key={form.key('packageJson')}
        {...form.getInputProps('packageJson')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoNativeSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NativeSelect
        label="Select framework"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoNumberInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 18,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NumberInput
        label="Your age"
        placeholder="Your age"
        min={0}
        max={120}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoPasswordInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <PasswordInput
        label="Password"
        placeholder="Your password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoPinInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pin: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Enter PIN
      </Text>
      <PinInput key={form.key('pin')} {...form.getInputProps('pin')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoRadioGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Radio.Group
        label="Select your favorite framework/library"
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      >
        <Group mt="xs">
          <Radio value="react" label="React" />
          <Radio value="mantine" label="Mantine" />
          <Radio value="ng" label="Angular" />
          <Radio value="svelte" label="Svelte" />
        </Group>
      </Radio.Group>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoRangeSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      range: [20, 80] as [number, number],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Price range
      </Text>
      <RangeSlider key={form.key('range')} {...form.getInputProps('range')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoRating() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rating: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Rating
      </Text>
      <Rating key={form.key('rating')} {...form.getInputProps('rating')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoSegmentedControl() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Select framework
      </Text>
      <SegmentedControl
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      value: 40,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Volume
      </Text>
      <Slider key={form.key('value')} {...form.getInputProps('value')} />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoSwitch() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      notifications: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch
        label="Enable notifications"
        key={form.key('notifications')}
        {...form.getInputProps('notifications', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoSwitchGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch.Group
        label="Select your favorite frameworks/libraries"
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Switch value="react" label="React" />
          <Switch value="mantine" label="Mantine" />
          <Switch value="ng" label="Angular" />
          <Switch value="svelte" label="Svelte" />
        </Group>
      </Switch.Group>

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoTextarea() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Textarea
        label="Your message"
        placeholder="Your message"
        key={form.key('message')}
        {...form.getInputProps('message')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoAutocomplete() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Autocomplete
        label="Pick framework"
        placeholder="Pick framework"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoMultiSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MultiSelect
        label="Pick frameworks"
        placeholder="Pick frameworks"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Select
        label="Pick framework"
        placeholder="Pick framework"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoTagsInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TagsInput
        label="Press Enter to submit a tag"
        placeholder="Enter tag"
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

function DemoMaskInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MaskInput
        mask="(999) 999-9999"
        placeholder="(___) ___-____"
        label="Phone"
        key={form.key('phone')}
        defaultValue={form.getValues().phone}
        onChangeRaw={(raw) => form.setFieldValue('phone', raw, { forceUpdate: false })}
      />

      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
const RendynExampleComponent = DemoTextInput;
export function RendynExample() { return <RendynExampleComponent  />; }
const RendynExample2Component = DemoAngleSlider;
export function RendynExample2() { return <RendynExample2Component  />; }
const RendynExample3Component = DemoCheckbox;
export function RendynExample3() { return <RendynExample3Component  />; }
const RendynExample4Component = DemoCheckboxGroup;
export function RendynExample4() { return <RendynExample4Component  />; }
const RendynExample5Component = DemoChip;
export function RendynExample5() { return <RendynExample5Component  />; }
const RendynExample6Component = DemoColorInput;
export function RendynExample6() { return <RendynExample6Component  />; }
const RendynExample7Component = DemoColorPicker;
export function RendynExample7() { return <RendynExample7Component  />; }
const RendynExample8Component = DemoFieldset;
export function RendynExample8() { return <RendynExample8Component  />; }
const RendynExample9Component = DemoFileInput;
export function RendynExample9() { return <RendynExample9Component  />; }
const RendynExample10Component = DemoInput;
export function RendynExample10() { return <RendynExample10Component  />; }
const RendynExample11Component = DemoJsonInput;
export function RendynExample11() { return <RendynExample11Component  />; }
const RendynExample12Component = DemoNativeSelect;
export function RendynExample12() { return <RendynExample12Component  />; }
const RendynExample13Component = DemoNumberInput;
export function RendynExample13() { return <RendynExample13Component  />; }
const RendynExample14Component = DemoPasswordInput;
export function RendynExample14() { return <RendynExample14Component  />; }
const RendynExample15Component = DemoPinInput;
export function RendynExample15() { return <RendynExample15Component  />; }
const RendynExample16Component = DemoRadioGroup;
export function RendynExample16() { return <RendynExample16Component  />; }
const RendynExample17Component = DemoRangeSlider;
export function RendynExample17() { return <RendynExample17Component  />; }
const RendynExample18Component = DemoRating;
export function RendynExample18() { return <RendynExample18Component  />; }
const RendynExample19Component = DemoSegmentedControl;
export function RendynExample19() { return <RendynExample19Component  />; }
const RendynExample20Component = DemoSlider;
export function RendynExample20() { return <RendynExample20Component  />; }
const RendynExample21Component = DemoSwitch;
export function RendynExample21() { return <RendynExample21Component  />; }
const RendynExample22Component = DemoSwitchGroup;
export function RendynExample22() { return <RendynExample22Component  />; }
const RendynExample23Component = DemoTextarea;
export function RendynExample23() { return <RendynExample23Component  />; }
const RendynExample24Component = DemoAutocomplete;
export function RendynExample24() { return <RendynExample24Component  />; }
const RendynExample25Component = DemoMultiSelect;
export function RendynExample25() { return <RendynExample25Component  />; }
const RendynExample26Component = DemoSelect;
export function RendynExample26() { return <RendynExample26Component  />; }
const RendynExample27Component = DemoTagsInput;
export function RendynExample27() { return <RendynExample27Component  />; }
const RendynExample28Component = DemoMaskInput;
export function RendynExample28() { return <RendynExample28Component  />; }
