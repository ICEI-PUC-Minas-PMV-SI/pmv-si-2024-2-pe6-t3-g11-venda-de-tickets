import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Product from "@/components/Product";
import { CarrinhoI, ItemCarrinhoI } from "@/constants/CartTypes";
import { fetchData } from "@/services/apiService";

export default function CartDetails() {
  const [cart, setCart] = useState<CarrinhoI>();
  const [itensCart, setItensCart] = useState<Array<ItemCarrinhoI>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetchData(`carrinho/usuario?email=${email}`);

    if (response.statusCode == 200) {
      setCart(response.data);
      setItensCart(response.data.itensCarrinho);
    } else {
      throw new Error("Erro ao pegar itens do carrinho");
    }
  };

  const verifyItemsPaid = () => {
    let paid = false;

    if (itensCart.length > 0) {
      for (const item of itensCart) {
        if (item.status === "PAGO") {
          paid = true;
        }
      }
    }

    return paid;
  };

  const showEmpty = () => {
    return (
      <View>
        <Text style={styles.alertText}>Nenhum ticket foi comprado</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.cartText}>Carrinho de Compras</Text>
      {verifyItemsPaid()
        ? cart?.itensCarrinho.map((itemCart) => <Product key={itemCart.id} itemCart={itemCart} />)
        : showEmpty()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
