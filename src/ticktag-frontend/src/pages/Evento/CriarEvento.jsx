import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './CriarEvento.css';
import { createEvento } from '../../services/apiService';

function CriarEvento() {
    const navigate = useNavigate();
    const [evento, setEvento] = useState({
        nomeEvento: '',
        statusEvento: '',
        dataEvento: '',
        horaEvento: '',
        endereco: {
            tipoLogradouro: '',
            nomeLogradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            nomeEspaco: ''
        },
        tickets: [],
        lotacaoMaxima: '',
        classificacaoIdade: '',
        baseImagem: ''
    });

    const [ingresso, setIngresso] = useState({
        lote: '',
        qtdLote: '',
        valorTicket: '',
        valorMeiaTicket: '',
        tipoTicket: '',
        statusTicket: 'disponível'
    });

    const [opcoesTipoIngresso, setOpcoesTipoIngresso] = useState([]);
    const [novoTipoIngresso, setNovoTipoIngresso] = useState('');
    const [ingressoAdicionado, setIngressoAdicionado] = useState(false);

    const estados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const tipDeLogradouros = [
        "Avenida",
        "Rua",
        "Praça",
        "Travessa",
        "Alameda",
        "Estrada",
        "Rodovia",
        "Boulevard",
        "Vila",
        "Condomínio",
        "Largo",
        "Campo",
        "Passagem",
        "Ponte",
        "Viaduto",
        "Morro",
        "Praia",
        "Caminho",
        "Setor",
        "Quadra",
        "Área",
        "Sítio",
        "Fazenda",
        "Hiperlote",
        "Parque",
        "Pátio",
        "Canteiro",
        "Beco",
        "Cerro",
        "Marginal",
        "Escadaria",
        "Subida",
        "Ladeira",
        "Jardim",
        "Bairro"
    ];

    // Manipula mudanças nos campos do formulário de evento
    const manipularMudancaEvento = (e) => {
        const {name, value} = e.target;
        setEvento(prevState => ({...prevState, [name]: value}));
    };

    // Manipula mudanças nos campos do endereço
    const manipularMudancaEndereco = (e) => {
        const {name, value} = e.target;
        setEvento(prevState => ({
            ...prevState,
            endereco: {...prevState.endereco, [name]: value}
        }));
    };

    // Manipula mudanças nos campos do ingresso
    const manipularMudancaIngresso = (e) => {
        const {name, value} = e.target;
        setIngresso(prevState => ({...prevState, [name]: value}));
    };

    // Adiciona um novo ingresso ao evento
    const adicionarIngresso = () => {
        if (!ingressoAdicionado && (!ingresso.tipoTicket || !ingresso.lote || !ingresso.qtdLote || !ingresso.valorTicket)) {
            alert('Por favor, preencha todos os campos obrigatórios do ingresso.');
            return;
        }

        setEvento(prevState => ({
            ...prevState,
            tickets: [...prevState.tickets, {...ingresso}]
        }));

        setIngresso({
            lote: '',
            qtdLote: '',
            valorTicket: '',
            valorMeiaTicket: '',
            tipoTicket: '',
            statusTicket: 'disponível'
        });

        setIngressoAdicionado(true);
    };

    // Adiciona uma nova opção de tipo de ingresso
    const adicionarOpcaoTipoIngresso = () => {
        if (novoTipoIngresso.trim() === '') {
            alert('Por favor, insira um tipo de ingresso válido.');
            return;
        }
        setOpcoesTipoIngresso([...opcoesTipoIngresso, novoTipoIngresso]);
        setNovoTipoIngresso('');
    };

    // Combina a data e a hora do evento em um formato ISO
    const combinarDataHora = () => {
        if (evento.dataEvento && evento.horaEvento) {
            return new Date(`${evento.dataEvento}T${evento.horaEvento}:00`).toISOString();
        }
        return null;
    };

    const manipularMudancaImagem = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Remove o prefixo
                setEvento((prev) => ({...prev, baseImagem: base64String})); // Armazena somente a parte base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Submete o formulário do evento
    const manipularSubmissao = async (e) => {
        e.preventDefault();

        if (!evento.nomeEvento || !evento.statusEvento || !combinarDataHora() || !evento.lotacaoMaxima || !evento.classificacaoIdade) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (evento.tickets.length === 0) {
            alert('Por favor, adicione pelo menos um tipo de ingresso.');
            return;
        }

        const eventoFormatado = {
            ...evento,
            dataEvento: combinarDataHora()
        };
      
        try {
            const dados = await createEvento(eventoFormatado);
            navigate('/evento/id/' + dados.data.id);
            console.log('Evento criado:', dados);
        } catch (erro) {
            console.error('Erro ao enviar o evento:', erro);
        }
    };

    return (
        <div className="criar-evento-page container">
            {evento.baseImagem !== '' && (
                <div
                    className="hero-section"
                    style={{backgroundImage: `url("data:image/png;base64,${evento.baseImagem}")`}}
                >
                    <div className="hero-overlay">
                        <h1 className="hero-title">{evento.nomeEvento}</h1>
                    </div>
                </div>
            )}
            <h2 className="mx-6 mt-4">Criar Evento</h2>
            <p>Preencha os detalhes do evento. Campos marcados com * são obrigatórios.</p>
            <form onSubmit={manipularSubmissao}>
                {/* Seção: Informações Básicas */}
                <section className="section">
                    <h4 className="section-title">Informações Básicas</h4>
                    <div className="form-group row">
                        <div className="col-md">
                            <label htmlFor="nomeEvento">Nome do Evento*</label>
                            <input
                                type="text"
                                id="nomeEvento"
                                className="form-control"
                                name="nomeEvento"
                                value={evento.nomeEvento}
                                onChange={manipularMudancaEvento}
                                required
                            />
                        </div>
                        <div className="col-md">
                            <label htmlFor="baseImagem">Imagem do Evento*</label>
                            <input
                                type="file"
                                id="baseImagem"
                                className="form-control"
                                name="baseImagem"
                                onChange={manipularMudancaImagem}
                                required
                            />

                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusEvento">Status do Evento*</label>
                        <select
                            id="statusEvento"
                            className="form-control"
                            name="statusEvento"
                            value={evento.statusEvento}
                            onChange={manipularMudancaEvento}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="planejado">Planejado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="dataEvento">Data do Evento*</label>
                            <input
                                type="date"
                                id="dataEvento"
                                className="form-control"
                                name="dataEvento"
                                value={evento.dataEvento}
                                onChange={manipularMudancaEvento}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="horaEvento">Hora do Evento*</label>
                            <input
                                type="time"
                                id="horaEvento"
                                className="form-control"
                                name="horaEvento"
                                value={evento.horaEvento}
                                onChange={manipularMudancaEvento}
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Seção: Endereço */}
                <section className="section">
                    <h4 className="section-title">Endereço</h4>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="nomeEspaco">Nome Espaço</label>
                            <input
                                type="text"
                                id="nomeEspaco"
                                className="form-control"
                                name="nomeEspaco"
                                value={evento.endereco.nomeEspaco}
                                onChange={manipularMudancaEndereco}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="tipoLogradouro">Tipo de Logradouro*</label>
                            <select
                                id="tipoLogradouro"
                                className="form-control"
                                name="tipoLogradouro"
                                value={evento.endereco.tipoLogradouro}
                                onChange={manipularMudancaEndereco}
                                required
                            >
                                <option value="">Selecione</option>
                                {tipDeLogradouros.map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="nomeLogradouro">Nome do Logradouro*</label>
                            <input
                                type="text"
                                id="nomeLogradouro"
                                className="form-control"
                                name="nomeLogradouro"
                                value={evento.endereco.nomeLogradouro}
                                onChange={manipularMudancaEndereco}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="numero">Número*</label>
                            <input
                                type="number"
                                id="numero"
                                className="form-control"
                                name="numero"
                                value={evento.endereco.numero}
                                onChange={manipularMudancaEndereco}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="complemento">Complemento</label>
                            <input
                                type="text"
                                id="complemento"
                                className="form-control"
                                name="complemento"
                                value={evento.endereco.complemento}
                                onChange={manipularMudancaEndereco}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="bairro">Bairro*</label>
                            <input
                                type="text"
                                id="bairro"
                                className="form-control"
                                name="bairro"
                                value={evento.endereco.bairro}
                                onChange={manipularMudancaEndereco}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="cidade">Cidade*</label>
                            <input
                                type="text"
                                id="cidade"
                                className="form-control"
                                name="cidade"
                                value={evento.endereco.cidade}
                                onChange={manipularMudancaEndereco}
                                required
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="uf">UF (Estado)*</label>
                            <select
                                id="uf"
                                className="form-control"
                                name="uf"
                                value={evento.endereco.uf}
                                onChange={manipularMudancaEndereco}
                                required
                            >
                                <option value="">Selecione</option>
                                {estados.map(estado => (
                                    <option key={estado} value={estado}>{estado}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Seção: Ingressos */}
                <section className="section">
                    <h4 className="section-title">Ingressos</h4>
                    {/* Linha superior */}
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="lote">Lote*</label>
                            <input
                                type="number"
                                id="lote"
                                className="form-control"
                                name="lote"
                                value={ingresso.lote}
                                onChange={manipularMudancaIngresso}
                                required={!ingressoAdicionado}
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="qtdLote">Quantidade*</label>
                            <input
                                type="number"
                                id="qtdLote"
                                className="form-control"
                                name="qtdLote"
                                value={ingresso.qtdLote}
                                onChange={manipularMudancaIngresso}
                                required={!ingressoAdicionado}
                            />
                        </div>
                    </div>

                    {/* Linha do meio */}
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="tipoTicket">Tipo de Ingresso*</label>
                            <select
                                id="tipoTicket"
                                className="form-control"
                                name="tipoTicket"
                                value={ingresso.tipoTicket}
                                onChange={manipularMudancaIngresso}
                                required={!ingressoAdicionado}
                            >
                                <option value="">Nenhum tipo selecionado</option>
                                {opcoesTipoIngresso.map((opcao, index) => (
                                    <option key={index} value={opcao}>{opcao}</option>
                                ))}
                            </select>
                            <div className="adicionar-opcao-tipo">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Novo tipo de ingresso"
                                    value={novoTipoIngresso}
                                    onChange={(e) => setNovoTipoIngresso(e.target.value)}
                                />
                                <button type="button" className="btn btn-outline" onClick={adicionarOpcaoTipoIngresso}>
                                    Adicionar Tipo
                                </button>
                            </div>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="valorTicket">Valor*</label>
                            <input
                                type="number"
                                id="valorTicket"
                                className="form-control"
                                name="valorTicket"
                                value={ingresso.valorTicket}
                                onChange={manipularMudancaIngresso}
                                required={!ingressoAdicionado}
                            />
                            <label htmlFor="valorMeiaTicket">Valor Meia</label>
                            <input
                                type="number"
                                id="valorMeiaTicket"
                                className="form-control"
                                name="valorMeiaTicket"
                                value={ingresso.valorMeiaTicket}
                                onChange={manipularMudancaIngresso}
                            />
                            <button type="button" className="btn btn-add mt-3" onClick={adicionarIngresso}>
                                Adicionar Ingresso
                            </button>
                        </div>
                    </div>

                    {/* Linha inferior (lista de ingressos) */}
                    {evento.tickets.length > 0 && (
                        <ul className="lista-ingressos">
                            {evento.tickets.map((t, index) => (
                                <li key={index} className="item-ingresso">
                                    <i className="fas fa-ticket-alt"></i> Lote: {t.lote}, Quantidade: {t.qtdLote},
                                    Valor: R${t.valorTicket}, Valor Meia: R${t.valorMeiaTicket}, Tipo: {t.tipoTicket}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Seção: Informações Adicionais */}
                <section className="section">
                    <h4 className="section-title">Informações Adicionais</h4>
                    <div className="form-group">
                        <label htmlFor="lotacaoMaxima">Lotação Máxima*</label>
                        <input
                            type="number"
                            id="lotacaoMaxima"
                            className="form-control"
                            name="lotacaoMaxima"
                            value={evento.lotacaoMaxima}
                            onChange={manipularMudancaEvento}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="classificacaoIdade">Classificação Etária*</label>
                        <input
                            type="number"
                            id="classificacaoIdade"
                            className="form-control"
                            name="classificacaoIdade"
                            value={evento.classificacaoIdade}
                            onChange={manipularMudancaEvento}
                            required
                        />
                    </div>
                </section>

                <button type="submit" className="btn btn-primary">Criar Evento</button>
            </form>
        </div>
    );
}

export default CriarEvento;
