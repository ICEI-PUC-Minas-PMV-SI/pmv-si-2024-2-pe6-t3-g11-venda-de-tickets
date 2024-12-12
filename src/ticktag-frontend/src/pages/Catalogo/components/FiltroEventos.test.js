import { render, screen, fireEvent } from '@testing-library/react';
import FiltroEventos from './FiltroEventos';

test('renderiza os filtros', () => {
    render(<FiltroEventos filtros={{}} onChange={() => {}} onApply={() => {}} onClear={() => {}} />);

    expect(screen.getByLabelText(/Data do Evento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Classificação Idade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lotação Máxima/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Evento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status do Evento/i)).toBeInTheDocument();
});

test('Chama o método onApply quando o botão é clicado', () => {
    const onApply = jest.fn();
    render(<FiltroEventos filtros={{}} onChange={() => {}} onApply={onApply} onClear={() => {}} />);

    fireEvent.click(screen.getByText(/Aplicar Filtros/i));
    expect(onApply).toHaveBeenCalled();
});
