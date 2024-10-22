import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RootLayout from '@/app/layout';

describe('MyLayout', () => {
  it('renders the footnote', () => {
    const originalError = console.error;
    console.error = jest.fn();

    render(
      <RootLayout>
        <div>Dummy</div>
      </RootLayout>,
    ); // <-- render RootLayout here.

    const footnote = screen.getByText('Dummy');
    expect(footnote).toBeInTheDocument();
    expect(screen.getByText(/dummy/i)).toBeInTheDocument();

    console.error = originalError;
  });
});
