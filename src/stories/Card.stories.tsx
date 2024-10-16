import { ReactNode } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import CardBody from '@/components/card/card-body/CardBody';
import CardHeader from '@/components/card/card-header/CardHeader';
import Card from '@/components/card/card/Card';

// Storybook metadata for the Card component
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardHeader: CardHeader as React.ComponentType<unknown>,
    CardBody: CardBody as React.ComponentType<unknown>,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'The variant type of the card',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional class names for custom styling',
    },
    children: {
      control: 'object',
      description: 'Content of the card',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

const children = (variant: string, title: string): ReactNode => {
  return (
    <>
      <CardHeader>{variant}</CardHeader>
      <CardBody title={title}>
        {
          "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
      </CardBody>
    </>
  );
};

// Default story configuration
export const Default: Story = {
  args: {
    variant: '',
    children: children('Default', 'This is a default card'),
  },
};

// Stories for each variant of the card
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: children('Primary', 'This is a primary card'),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: children('Secondary', 'This is a secondary card'),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: children('Success', 'This is a success card'),
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: children('Danger', 'This is a danger card'),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: children('Warning', 'This is a warning card'),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: children('Info', 'This is a info card'),
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    children: children('Light', 'This is a light card'),
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: children('Dark', 'This is a dark card'),
  },
};
