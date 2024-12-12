import { render, screen } from '@testing-library/react';
import ListaEventos from './ListaEventos';
import {MemoryRouter} from "react-router-dom";

test('Renderiza os cartões de eventos', () => {
    const eventos = [{ nomeEvento: 'Evento Teste', dataEvento: '2023-10-10', capaEvento: '' }];

    render(
        <MemoryRouter>
            <ListaEventos eventos={eventos} />
        </MemoryRouter>
    );

    expect(screen.getByText(/Evento Teste/i)).toBeInTheDocument();
});
