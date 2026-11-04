import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

function TestComponent() {
  return <h1>DevSecOps Portfolio</h1>;
}

describe('Frontend Next.js', () => {
  it('affiche le titre du Portfolio', () => {
    render(<TestComponent />);

    expect(
      screen.getByRole('heading', { name: 'DevSecOps Portfolio' }),
    ).toBeInTheDocument();
  });
});
