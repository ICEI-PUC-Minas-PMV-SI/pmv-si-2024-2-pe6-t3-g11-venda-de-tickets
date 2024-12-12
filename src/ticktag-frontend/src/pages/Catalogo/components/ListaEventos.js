import React from 'react';
import CartaoEvento from './CartaoEvento';
import { Col } from "react-bootstrap";

function ListaEventos({ eventos }) {
    return (
        eventos.map((evento, index) => (
            <Col sm={12} md={6} lg={4} className="mb-4" key={index}>
                <CartaoEvento evento={evento} />
            </Col>
        ))
    );
}

export default ListaEventos;
