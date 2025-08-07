import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../src/components/Game';

test('renders game title', () => {
  render(<Game soundEnabled={false} setSoundEnabled={() => {}} />);
  expect(screen.getByText(/GITHUB ADVANCED SECURITY JEOPARDY/i)).toBeInTheDocument();
});
