import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardPage from '@/app/card/[variant]/page';

describe('Card Page', () => {
  it('renders a Card with variant="primary"', async () => {
    // Mock the dynamic `params` that are passed to the component
    const params = { variant: 'primary' };

    // Render the CardPage component with the mocked params
    render(<CardPage params={params} />);

    // Check if the Card component is rendered with the correct variant
    const element = screen.getByRole('card');
    expect(element).toHaveClass('bg-primary');

    // Check if the header and body are rendered correctly
    expect(
      screen.getByText(
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      ),
    ).toBeInTheDocument();
  });
});
