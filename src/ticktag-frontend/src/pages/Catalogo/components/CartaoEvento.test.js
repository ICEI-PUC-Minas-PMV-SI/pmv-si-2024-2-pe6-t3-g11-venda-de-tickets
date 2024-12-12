import { render, screen } from '@testing-library/react';
import CartaoEvento from './CartaoEvento';
import {MemoryRouter} from "react-router-dom";

test('Mostrar dados do evento', () => {
    const evento = {
        nomeEvento: 'Evento Teste',
        dataEvento: '2023-10-10',
        capaEvento: '',
        endereco: { nomeLogradouro: 'Rua Exemplo', cidade: 'Cidade Teste' },
        lotacaoMaxima: 100,
        classificacaoIdade: '10+',
        statusEvento: 'ativo'
    };

    render(
        <MemoryRouter>
            <CartaoEvento evento={evento} />
        </MemoryRouter>
    );

    expect(screen.getByText(/Evento Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Rua Exemplo/i)).toBeInTheDocument();
});
