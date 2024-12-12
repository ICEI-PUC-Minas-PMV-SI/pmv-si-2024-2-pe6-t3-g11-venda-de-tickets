import React from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

function CartaoEvento({ evento }) {
    const date = new Date(evento.dataEvento);
    const dataFormatada = date.toLocaleDateString("pt-BR");
    const horaFormatada = date.toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <Card>
            <Card.Img variant="top" src={`data:image/png;base64,${evento.capaEvento}`} />
            <Card.Body>
                <Card.Title>{evento.nomeEvento}</Card.Title>
                <Card.Subtitle className="mb-1" >{dataFormatada} - {horaFormatada}</Card.Subtitle>
                <Card.Text className="fs-6 fst-italic">
                    {evento.endereco &&
                        evento.endereco.nomeLogradouro + '-' + evento.endereco.cidade}
                </Card.Text>
                <Card.Text className="mb-1">
                    <strong>Lotação Máxima:</strong> {evento.lotacaoMaxima}</Card.Text>
                <Card.Text className="mb-1">
                    <strong>Classificação
                        Etária:</strong> {evento.classificacaoIdade}</Card.Text>
                <Card.Text className="mb-3">
                    <strong>Status:</strong> {evento.statusEvento}
                </Card.Text>
                <Link to={`/evento/id/${evento.id}`} className="btn btn-primary">Saiba Mais</Link>
            </Card.Body>
        </Card>

    );
}
export default CartaoEvento;
