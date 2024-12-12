import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Pagamento.css";
import { useNavigate } from "react-router-dom";
import { fetchData, updateData } from "../../services/apiService";

function Pagamento() {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [carrinho, setCarrinho] = useState({});
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [progress, setProgress] = useState(0);
  const [pagamento, setPagamento] = useState("pendente");
  const navigate = useNavigate();
  const totalDuration = 10000;
  const intervalDuration = 100;
  const pix =
    "00020126480014BR.GOV.BCB.PIX0136randomfakexyzid52040000530398654041.905802BR5909Belo Horizonte6009br.gov.pix6304randomcode";

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handlePaymentDone = async () => {
      if (pagamento === "completo") {
        const response = await updateData(`carrinho/comprar/${carrinho.id}`, carrinho, localStorage.getItem("token"));
  
        if (response.statusCode === 200) {
          setTimeout(() => {
            navigate("/tickets");
          }, 5000);
        } else {
          throw new Error("Erro ao comprar itens do carrinho");
        }
      }
    };

    handlePaymentDone();
  });

  const calculateProgress = () => {
    const increment = (intervalDuration / totalDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        let newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setPagamento("completo");
          newProgress = 100;
        }
        return newProgress;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  };

  const getData = async () => {
    const response = await fetchData(
      `carrinho/usuario?email=${localStorage.getItem("email")}`,
      localStorage.getItem("token")
    );

    if (response.statusCode !== 200) {
      throw new Error("Erro ao pegar itens do carrinho");
    } else {
      setCarrinho(response.data);
      setItensCarrinho(response.data.itensCarrinho);
    }
  };

  const calcularTotal = () => {
    let soma = 0.0;
    if (itensCarrinho.length > 0) {
      for (const item of itensCarrinho) {
        if (item.status === "PENDENTE") {
          let itemValor = item.tipoTicket.valorTicket * item.quantidade;
          soma += itemValor;
        }
      }
    }
    return soma.toFixed(2);
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    calculateProgress();
  };

  const handlePixPayment = (e) => {
    e.preventDefault();
    calculateProgress();
  };

  const handleCancel = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const progressBar = (text, payment) => {
    let element;
    if (progress === 0) {
      element = (
        <button className="button" onClick={payment}>
          Pagar com {text}
        </button>
      );
    } else if (progress < 100 && progress !== 0) {
      element = (
        <div className="progress-bar container">
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
      );
    } else {
      element = (
        <p style={{ fontWeight: "bold", fontSize: "20px", color: "green" }}>
          Pagamento aprovado, redirecionando para a tela de tickets
        </p>
      );
    }
    return element;
  };

  return (
    <div className="payment-container">
      <h1>Confirmação de Pagamento</h1>

      <div className="order-details">
        <h3>Resumo do Pedido</h3>
        <p style={{ fontSize: "20px" }}>
          <strong>Valor:</strong> R$ {calcularTotal()}
        </p>
      </div>

      <div className="payment-methods">
        <h3>Escolha o Método de Pagamento</h3>
        <div className="payment-tabs">
          <div
            className={`payment-options ${paymentMethod === "pix" ? "active" : ""}`}
            onClick={() => setPaymentMethod("pix")}
          >
            Pix
          </div>
          <div
            className={`payment-options ${paymentMethod === "credit-card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("credit-card")}
          >
            Cartão de Crédito
          </div>
        </div>
        <div
          className={`payment-option ${paymentMethod === "credit-card" ? "active credit-card" : ""}`}
          onClick={() => setPaymentMethod("credit-card")}
        >
          {paymentMethod === "credit-card" && (
            <form>
              <label htmlFor="card-number">Número do Cartão</label>
              <input
                type="text"
                id="card-number"
                name="card-number"
                placeholder="Número do Cartão"
                maxLength={16}
                required
              />
              <label htmlFor="card-expiry">Data de Expiração</label>
              <input type="text" id="card-expiry" name="card-expiry" maxLength={5} placeholder="MM/AA" required />
              <label htmlFor="card-cvc">CVV</label>
              <input type="text" id="card-cvc" name="card-cvc" maxLength={4} placeholder="CVV" required />
              {progressBar("Cartão", handleCardPayment)}
            </form>
          )}
        </div>

        <div
          className={`payment-option ${paymentMethod === "pix" ? "active pix" : ""}`}
          onClick={() => setPaymentMethod("pix")}
        >
          {paymentMethod === "pix" && (
            <form>
              <div className="pix-details">
                <p>
                  <strong>Pagamento via PIX</strong>
                </p>
                <div className="qr-code-and-button">
                  <QRCodeSVG className="pix-qr-code" value={pix} size={154} style={{ marginBottom: "10px" }} />
                  {progressBar("PIX", handlePixPayment)}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="confirmation-buttons">
        <button className="button confirm-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Pagamento;
