import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Product from "@/components/Product";
import { CarrinhoI, ItemCarrinhoI } from "@/constants/CartTypes";
import { deleteData, fetchData, updateData } from "@/services/apiService";
import Sum from "@/components/Sum";

export default function CartDetails() {
  const [cart, setCart] = useState<CarrinhoI>();
  const [itensCart, setItensCart] = useState<Array<ItemCarrinhoI>>([]);

  useEffect(() => {
    getData();
  }, []);

  // REMOVE E-MAIL
  const getData = async () => {
    const response = await fetchData(`carrinho/usuario?email=${email}`);

    if (response.statusCode == 200) {
      setCart(response.data);
      setItensCart(response.data.itensCarrinho);
    } else {
      throw new Error("Erro ao pegar itens do carrinho");
    }
  };

  const removeFromCart = async (item: ItemCarrinhoI) => {
    const response = await deleteData(`item-carrinho/${item.id}`);

    if (response.statusCode !== 200) {
      throw new Error("Erro ao remover item do carrinho");
    } else {
      getData();
    }
  };

  const updateCart = async (item: ItemCarrinhoI, action: string) => {
    let newQuantity = item.quantidade;

    if (action === "increase") {
      newQuantity += 1;
    } else if (action === "decrease") {
      if (newQuantity > 1) {
        newQuantity -= 1;
      } else {
        alert(`A quantidade mínima de ingressos é: ${newQuantity}, caso queira removê-lo, clique no botão ao lado `);
      }
    }

    const newItem: ItemCarrinhoI = { ...item, quantidade: newQuantity };
    delete newItem.id;

    const response = await updateData(`item-carrinho/${item.id}`, newItem);

    if (response.statusCode !== 200) {
      throw new Error("Erro ao atualizar item do carrinho");
    } else {
      getData();
    }
  };

  const calculateTotal = () => {
    let sum: number = 0.0;
    if (itensCart.length > 0) {
      for (const item of itensCart) {
        if (item.status === "PENDENTE") {
          let itemValor = item.tipoTicket.valorTicket * item.quantidade;
          sum += itemValor;
        }
      }
    }

    return sum;
  };

  const verifyItemsPending = () => {
    let pending = false;

    if (itensCart.length > 0) {
      for (const item of itensCart) {
        if (item.status === "PENDENTE") {
          pending = true;
        }
      }
    }

    return pending;
  };

  const showEmptyCard = () => {
    return (
      <View>
        <Text style={styles.alertText}>Nenhum item foi selecionado, o carrinho está vazio.</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.cartText}>Carrinho de Compras</Text>
        {verifyItemsPending()
          ? cart?.itensCarrinho.map((itemCart) => (
              <Product
                key={itemCart.id}
                itemCart={itemCart}
                updateQuantity={updateCart}
                removeFromCart={removeFromCart}
              />
            ))
          : showEmptyCard()}
      </ScrollView>
      <View style={styles.sumContainer}>
        <Sum calculateTotal={calculateTotal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  cartText: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  alertText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  sumContainer: {
    height: 80,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
