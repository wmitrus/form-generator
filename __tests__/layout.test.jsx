import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Layout from '@/app/layout';

describe('Page', () => {
  it('renders a heading', () => {
    const mockChildren = <div>Children component</div>;
    const { container } = render(<Layout>{mockChildren}</Layout>);

    const bodyTag = container.querySelector('body');
    expect(bodyTag).toBeInTheDocument();
    expect(bodyTag).toContainHTML('<div>Children component</div>');
  });
});
