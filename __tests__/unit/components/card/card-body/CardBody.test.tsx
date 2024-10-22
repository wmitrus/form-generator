import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardBody from '@/components/card/card-body/CardBody';

describe('Component', () => {
  it('renders a Card - query selector', () => {
    const { container } = render(<CardBody>Sample text</CardBody>);

    const element = container.querySelector('#cardBody');
    expect(element).toBeInTheDocument();
  });

  it('renders a Card - getByRole', () => {
    render(<CardBody>Sample text</CardBody>);

    const element = screen.getByRole('card-body');
    expect(element).toBeInTheDocument();
  });
});
