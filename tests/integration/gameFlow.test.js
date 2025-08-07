import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Game from '../../src/components/Game';

describe('Game integration tests', () => {
  test('renders and starts a new game', () => {
    render(<Game soundEnabled={false} setSoundEnabled={() => {}} />);
    // Check initial score display
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    // Click New Game button
    const newGameBtn = screen.getByText(/NEW GAME/i);
    fireEvent.click(newGameBtn);
    // After reset, score should still display
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
  });
});
