import React from "react";
import { useNavigate } from "react-router-dom";

function Somatorio({ calculaTotal }) {
  const navigate = useNavigate();

  const handlePayment = () => {
    if (calculaTotal() !== 0) {
      alert("Redirecionando para a página de pagamento...");
      setTimeout(() => {
        navigate("/pagamento");
      }, 2000);
    } else {
      alert("Nenhum item no carrinho selecionado");
    }
  };

  return (
    <>
      <div className="box">
        <header>Resumo da Compra</header>
        <div className="info">
          <div>
            <span>Total</span>
            <span>R$ {calculaTotal()}</span>
          </div>
        </div>
      </div>
      <button onClick={handlePayment}>Finalizar Compra</button>
    </>
  );
}

export default Somatorio;
