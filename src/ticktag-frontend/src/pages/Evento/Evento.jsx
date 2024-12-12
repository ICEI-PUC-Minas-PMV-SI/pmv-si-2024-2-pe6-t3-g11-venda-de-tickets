import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// Usando Font Awesome para ícones
import DetalhesEvento from "./DetalhesEvento";
import ListaIngressos from "./ListaIngressos";
import Carregando from "./Carregando";
import NotificacaoErro from "./NotificacaoErro";
import "./Evento.css";
import {getEventoById} from "../../services/apiService";
import { createData } from '../../services/apiService';

function Evento() {
    const {idEvento} = useParams();
    const [evento, setEvento] = useState(null);
    const [erro, setErro] = useState(null);
    const [ingressoSelecionado, setIngressoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        getEventoById(idEvento)
            .then((responseData) => {
                if (responseData && responseData.data) {
                    setEvento(responseData.data);
                } else {
                    throw new Error("Evento não encontrado");
                }
            })
            .catch((err) => {
                console.error("Erro ao buscar evento:", err);
                setErro(err.message);
            });
    }, [idEvento]);

    if (erro) return <NotificacaoErro mensagem={erro}/>;
    if (!evento) return <Carregando/>;

    const handleTicketChange = (e) => {
        if(e.target.value){
            const ticketId = e.target.value;
            const ingresso = evento.tickets.find(t => t.id === parseInt(ticketId));
            setIngressoSelecionado(ingresso);
        }
    };

    const handleQuantityChange = (e) => {
        const novaQuantidade = e.target.value;
        setQuantidade(novaQuantidade);
    };

    const handleBuyNow = async () => {
        if (!ingressoSelecionado) {
            alert("Por favor, selecione um tipo de ingresso.");
            return;
        }
        if(!quantidade){
            alert("Por favor, informe uma quantidade de ingressos.");
            return;
        }
        
        const data = {
            carrinho: {
                usuario: {
                    email: localStorage.getItem("email"),
                },
            },
            evento: evento,
            tipoTicket: ingressoSelecionado,
            quantidade: quantidade,
            status: "PENDENTE",
        };
        
        try {
            const response = await createData("item-carrinho", data, localStorage.getItem("token"));
            if (response.statusCode !== 200) {
                throw new Error('Erro ao adicionar item ao carrinho');
            }

            const precoTotal = ingressoSelecionado.valorTicket * quantidade;
            alert(`Você adicionou: ${quantidade} ingressos ao seu carrinho, no valor de R$${precoTotal.toFixed(2)}.`);
        } catch (error) {
            console.error(error);
            alert(error);
        }        
    };

    return (
        <div className="evento-page">
            {/* Seção Hero com Banner */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url("data:image/png;base64,${evento.capaEvento}")`,
                }}
            >
                <div className="hero-overlay">
                    <h1 className="hero-title">{evento.nomeEvento}</h1>
                </div>
            </div>

            {/* Seção Principal de Conteúdo */}
            <div className="main-content container">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <DetalhesEvento evento={evento}/>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <ListaIngressos ingressos={evento.tickets}/>
                        <div className="purchase-section mt-4">
                            <h2 className="h5">Comprar Ingressos</h2>
                            <select
                                className="form-select mb-3"
                                onChange={handleTicketChange}
                            >
                                <option value="">Selecione o tipo de ingresso</option>
                                {evento.tickets.map((ingresso) => (
                                    <option key={ingresso.id} value={ingresso.id}>
                                        {ingresso.tipoTicket} - R${ingresso.valorTicket.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="form-control mb-3"
                                value={quantidade}
                                min="1"
                                onChange={handleQuantityChange}
                            />
                            <button className="btn btn-success w-100" onClick={handleBuyNow}>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Evento;
