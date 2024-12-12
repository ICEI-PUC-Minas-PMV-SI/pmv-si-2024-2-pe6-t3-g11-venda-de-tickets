import React from "react";
import Base64Image from "../../utils/BaseImage";

function Produto({ data, removerDoCarrinho, atualizarOCarrinho }) {
  return (
    <tr>
      <td>
        <div className="produto">
          <Base64Image base64String={data.evento?.capaEvento} />
          <div className="info">
            <div className="nome">{data.evento.nomeEvento}</div>
            <div className="tipo-ticket">Tipo: {data.tipoTicket?.tipoTicket}</div>
            <div className="lote">Lote: {data.tipoTicket?.lote}</div>
          </div>
        </div>
      </td>
      <td>R$ {data?.tipoTicket.valorTicket.toFixed(2)}</td>
      <td>
        {atualizarOCarrinho != null ? (
          <div className="quantidade">
            <button onClick={() => atualizarOCarrinho(data, "decrease")}>
              <i className="bx bx-minus">-</i>
            </button>
            <span>{data?.quantidade}</span>
            <button onClick={() => atualizarOCarrinho(data, "increase")}>
              <i className="bx bx-plus">+</i>
            </button>
          </div>
        ) : (
          <div className="quantiadde">
            <span>{data?.quantidade}</span>
          </div>
        )}
      </td>
      <td>R$ {(data.tipoTicket?.valorTicket * data?.quantidade).toFixed(2)}</td>
      {removerDoCarrinho != null ? (
        <td>
          <button
            className="remover"
            onClick={() => {
              removerDoCarrinho(data);
            }}
          >
            X<i className="bx bx-x"></i>
          </button>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
}

export default Produto;
