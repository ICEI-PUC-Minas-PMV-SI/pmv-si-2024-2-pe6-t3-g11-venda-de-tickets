import React from 'react';
import { render, screen } from '@testing-library/react';
import Politica from './Politica';

describe('Página de Política', () => {
  test('renderiza o título da política de privacidade', () => {
    render(<Politica />);
    const tituloElement = screen.getByText(/Política de Privacidade/i);
    expect(tituloElement).toBeInTheDocument();
  });

  test('renderiza a descrição da política de privacidade', () => {
    render(<Politica />);
    const descricaoElement = screen.getByText(/valorizamos e respeitamos sua privacidade/i);
    expect(descricaoElement).toBeInTheDocument();
  });
});
