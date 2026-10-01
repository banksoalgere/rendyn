"use client";

import { CaretRightIcon } from '@phosphor-icons/react';

import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';

import { DemoMenuItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Menu/_menu-items';

interface UserButtonProps extends React.ComponentProps<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  return (
    <UnstyledButton
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <CaretRightIcon size={16} />}
      </Group>
    </UnstyledButton>
  );
}

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      <DemoMenuItems withTarget={false} />
    </Menu>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
