import React, {act} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Catalogo from './Catalogo';
import { fetchPublicData } from '../../services/apiService';
import {MemoryRouter} from "react-router-dom";

// Mock the fetchPublicData function
jest.mock('../../services/apiService');

describe('Teste da página Catalogo', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Carregar todos os eventos na renderização inicial', async () => {
        const eventosMock = [
            { nomeEvento: 'Evento 1', dataEvento: '2024-11-01', classificacaoIdade: '18', lotacaoMaxima: 100, statusEvento: 'ativo' },
            { nomeEvento: 'Evento 2', dataEvento: '2024-11-02', classificacaoIdade: '16', lotacaoMaxima: 50, statusEvento: 'ativo' },
        ];
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });

        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento');
        });

        await waitFor(() => {
            eventosMock.forEach(evento => {
                expect(screen.getByText(evento.nomeEvento)).toBeInTheDocument();
            });
        });

    });

    test('Aplicar filtro de data', async () => {
        const eventosMock = [
            { nomeEvento: 'Evento 1', dataEvento: '01-11-2024T09:00:00', classificacaoIdade: '18', lotacaoMaxima: 100, statusEvento: 'ativo' },
        ];

        // Mock the fetchPublicData response before rendering the component
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });

        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );

        const dataInput = screen.getByLabelText(/Data do Evento/i);
        fireEvent.change(dataInput, { target: { value: '2024-11-01' } }); // Ensure the date format matches the input type
        fireEvent.click(screen.getByText(/Aplicar Filtros/i));

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento/filtro?dataEvento=01-11-2024');
        });

        // Check that the mock event is rendered
        expect(screen.getByText('Evento 1')).toBeInTheDocument();
    });

    test('Aplicar múltiplos filtros (Classificação Idade e Status)', async () => {
        const eventosMock = [
            { nomeEvento: 'Evento 1', dataEvento: '2024-11-01', classificacaoIdade: 18, lotacaoMaxima: 100, statusEvento: 'ativo' },
        ];
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });

        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );

        act(() => {
            fireEvent.change(screen.getByLabelText(/Classificação Idade/i), { target: { value: '18' } });
            fireEvent.change(screen.getByLabelText(/Status do Evento/i), { target: { value: 'ativo' } });
            fireEvent.click(screen.getByText(/Aplicar Filtros/i));
        });

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento/filtro?classificacaoIdade=18&statusEvento=ativo');
        });

        expect(screen.getByText('Evento 1')).toBeInTheDocument();
    });

    test('Aplicar filtros sem resultados correspondentes', async () => {
        fetchPublicData.mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Lotação Máxima/i), { target: { value: '1' } });
        fireEvent.click(screen.getByText(/Aplicar Filtros/i));

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento/filtro?lotacaoMaxima=1');
        });

        expect(screen.getByText(/Nenhum evento encontrado/i)).toBeInTheDocument();
    });

    test('Aplicar e limpar filtros', async () => {
        const eventosMock = [
            { nomeEvento: 'Evento 1', dataEvento: '01/11/2024', classificacaoIdade: '18', lotacaoMaxima: 100, statusEvento: 'cancelado' },
        ];
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });
        fetchPublicData.mockResolvedValueOnce({ data: [] });
        fetchPublicData.mockResolvedValueOnce({ data: eventosMock });

        render(
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento');
        });

        act(() => {
            fireEvent.change(screen.getByLabelText(/Status do Evento/i), { target: { value: 'ativo' } });
            fireEvent.click(screen.getByText(/Aplicar Filtros/i));
        });

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento/filtro?statusEvento=ativo');
        });

        expect(screen.getByText('Evento 1')).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText(/Limpar Filtros/i));
        });

        await waitFor(() => {
            expect(fetchPublicData).toHaveBeenCalledWith('evento');
        });

        expect(screen.getByText('Evento 1')).toBeInTheDocument();
    });
});
