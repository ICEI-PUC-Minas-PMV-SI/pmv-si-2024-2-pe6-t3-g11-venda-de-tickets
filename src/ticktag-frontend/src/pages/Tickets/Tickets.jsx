import React, { useEffect, useState } from "react";
import "../Carrinho/Carrinho.css";
import Produto from "../Carrinho/Produto";
import { fetchData } from "../../services/apiService";

function Tickets() {
  const [carrinho, setCarrinho] = useState({});
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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

  const verifyItemsPaid = () => {
    let paid = false;

    if(itensCarrinho.length > 0){
      for(const item of itensCarrinho){
        if(item.status === "PAGO"){
          paid = true;
        }
      }
    }

    return paid;
  }

  return (
    <div className="items-container">
      <div className="page-title" style={{fontWeight: "bold", fontSize: "35px"}}>Tickets</div>
      <div className="content">
        <section>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {verifyItemsPaid() ? (
                carrinho.itensCarrinho.map((item) =>
                  item.status === "PAGO" ? (
                    <Produto
                      key={item.id}
                      data={item}
                    />
                  ) : (
                    ""
                  )
                )
              ) : (
                <tr>
                  <td colSpan={"5"} style={{ textAlign: "center" }}>
                    Nenhum ticket foi comprado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Tickets;
