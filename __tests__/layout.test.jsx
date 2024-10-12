import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RootLayout from '@/app/layout';

describe('Page', () => {
  it('renders a heading', () => {
    const mockChildren = <div>Children component</div>;
    const { container } = render(<RootLayout>{mockChildren}</RootLayout>);

    const bodyTag = container.querySelector('body');
    expect(bodyTag).toBeInTheDocument();
    expect(bodyTag).toContainHTML('<div>Children component</div>');
  });
});
