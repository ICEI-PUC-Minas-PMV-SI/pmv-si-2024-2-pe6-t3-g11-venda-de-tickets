import React from 'react';

function ListaIngressos({ tickets }) {
    // console.log("tickets", tickets)
    if (!tickets || tickets.length === 0) {
        return <p className="text-muted">Nenhum ingresso disponível.</p>;
    }

    return (
        <section className="card p-3">
            <h2 className="h5">Ingressos Disponíveis</h2>
            {tickets.map((ingresso, index) => (
                <div key={index} className="d-flex justify-content-between border-bottom py-2">
                    <p className="mb-0"><strong>Tipo:</strong> {ingresso.tipoTicket}</p>
                    <p className="mb-0"><strong>Valor:</strong> R${ingresso.valorTicket?.toFixed(2)}</p>
                </div>
            ))}
        </section>
    );
}

export default ListaIngressos;
