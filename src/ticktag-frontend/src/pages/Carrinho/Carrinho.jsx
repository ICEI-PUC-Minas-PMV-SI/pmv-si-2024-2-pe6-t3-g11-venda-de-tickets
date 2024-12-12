import React, { useEffect, useState } from "react";
import "./Carrinho.css";
import Produto from "./Produto";
import Somatorio from "./Somatorio";
import { deleteData, fetchData, updateData } from "../../services/apiService";

function Carrinho() {
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

  const removerDoCarrinho = async (item) => {
    const response = await deleteData(`item-carrinho/${item.id}`, localStorage.getItem("token"));

    if (response.statusCode !== 200) {
      throw new Error("Erro ao remover item do carrinho");
    } else {
      getData();
    }
  };

  const atualizarOCarrinho = async (item, action) => {
    let novaQuantidade = item.quantidade;

    if (action === "increase") {
      novaQuantidade += 1;
    } else if (action === "decrease") {
      if (novaQuantidade > 1) {
        novaQuantidade -= 1;
      } else {
        alert(
          `A quantidade mínima de ingressos é: ${novaQuantidade}, caso queira removê-lo, clique no botão ao lado `
        );
      }
    }

    const novoItem = { ...item, quantidade: novaQuantidade };
    delete novoItem.id;

    const response = await updateData(`item-carrinho/${item.id}`, novoItem, localStorage.getItem("token"));

    if (response.statusCode !== 200) {
      throw new Error("Erro ao atualizar item do carrinho");
    } else {
      getData();
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

  const verifyItemsPending = () => {
    let pending = false;

    if(itensCarrinho.length > 0){
      for(const item of itensCarrinho){
        if(item.status === "PENDENTE"){
          pending = true;
        }
      }
    }

    return pending;
  }

  return (
    <div className="items-container">
      <div className="page-title">Carrinho de Compras</div>
      <div className="content">
        <section>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {verifyItemsPending() ? (
                carrinho.itensCarrinho.map((item) =>
                  item.status === "PENDENTE" ? (
                    <Produto
                      key={item.id}
                      data={item}
                      removerDoCarrinho={removerDoCarrinho}
                      atualizarOCarrinho={atualizarOCarrinho}
                    />
                  ) : (
                    ""
                  )
                )
              ) : (
                <tr>
                  <td colSpan={"5"} style={{ textAlign: "center" }}>
                    Nenhum item foi selecionado, o carrinho está vazio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <aside>
          <Somatorio calculaTotal={calcularTotal} />
        </aside>
      </div>
    </div>
  );
}

export default Carrinho;
