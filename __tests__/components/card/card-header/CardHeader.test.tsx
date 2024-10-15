import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardHeader from '@/components/card/card-header/CardHeader';

describe('Component', () => {
  it('renders a Card - query selector', () => {
    const { container } = render(<CardHeader>Sample text</CardHeader>);

    const element = container.querySelector('#cardHeader');
    expect(element).toBeInTheDocument();
  });

  it('renders a Card - getByRole', () => {
    render(<CardHeader>Sample text</CardHeader>);

    const element = screen.getByRole('card-header');
    expect(element).toBeInTheDocument();
  });
});
