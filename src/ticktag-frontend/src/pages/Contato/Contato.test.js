import React from 'react';
import { render, screen } from '@testing-library/react';
import Contato from './Contato';

describe('Página de Contato', () => {
  test('renderiza o título da página de contato', () => {
    render(<Contato />);
    const tituloElement = screen.getByText(/Contato com o Suporte/i);
    expect(tituloElement).toBeInTheDocument();
  });

  test('renderiza o e-mail de contato', () => {
    render(<Contato />);
    const emailElement = screen.getByText(/suporte@exemploingressos.com/i);
    expect(emailElement).toBeInTheDocument();
  });
});
