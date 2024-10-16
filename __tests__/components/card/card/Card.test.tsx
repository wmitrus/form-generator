import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Card from '@/components/card/card/Card';

describe('Component', () => {
  it('renders a Card - query selector, variant primary', () => {
    const { container } = render(<Card variant="primary"></Card>);

    const element = container.querySelector('#card');
    expect(element).toHaveClass('bg-primary');
  });

  it('renders a Card - variant secondary', () => {
    render(<Card variant="secondary"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-secondary');
  });

  it('renders a Card - variant success', () => {
    render(<Card variant="success"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-success');
  });

  it('renders a Card - danger variant', () => {
    render(<Card variant="danger"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-danger');
  });

  it('renders a Card - warning variant', () => {
    render(<Card variant="warning"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-warning');
  });

  it('renders a Card - info variant', () => {
    render(<Card variant="info"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-info');
  });

  it('renders a Card - light variant', () => {
    render(<Card variant="light"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-light');
  });

  it('renders a Card - dark variant', () => {
    render(<Card variant="dark"></Card>);

    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-dark');
  });

  it('renders a Card - default variant', () => {
    render(<Card></Card>);

    const element = screen.getByRole('card');
    expect(element).toBeInTheDocument();
  });
});
