import { EnderecoI, ItemCarrinhoI } from "@/constants/CartTypes";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductFuncI {
  itemCart: ItemCarrinhoI;
  updateQuantity?: (item: ItemCarrinhoI, action: string) => void;
  removeFromCart?: (item: ItemCarrinhoI) => void;
}

export default function Product({ itemCart, updateQuantity, removeFromCart }: ProductFuncI) {
  const formatAddress = (address: EnderecoI) => {
    let patioType = `${address.tipoLogradouro}`;
    if (patioType == "Avenida") {
      patioType = "Av.";
    }
    const finalAddress = `${patioType} ${address.nomeLogradouro}, ${address.bairro}`;
    return finalAddress;
  };

  const formatHour = (hour: string) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}\+\d{2}:\d{2}$/;
    const match = hour.match(regex);

    if (match) {
      const day = match[3];
      const month = match[2];
      const year = match[1];
      const hour = match[4];
      const minute = match[5];

      return `${day}/${month}/${year} · ${hour}:${minute}`;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.eventText}>{itemCart?.evento.nomeEvento}</Text>
        <Text style={styles.text}>{formatAddress(itemCart?.evento.endereco)}</Text>
        <Text style={styles.dateText}>{formatHour(itemCart?.evento.dataEvento)}</Text>
      </View>
      <View style={styles.priceQuantity}>
        <Text style={styles.priceText}>R$ {(itemCart?.tipoTicket.valorTicket * itemCart?.quantidade).toFixed(2)}</Text>
        {updateQuantity != null ? (
          <View style={styles.quantityView}>
            <Pressable style={styles.quantityButtons} onPress={() => updateQuantity(itemCart, "increase")}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
            <Text style={styles.quantityText}>{itemCart?.quantidade}</Text>
            <Pressable style={styles.quantityButtons} onPress={() => updateQuantity(itemCart, "decrease")}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.quantityText}>{itemCart?.quantidade}</Text>
        )}
      </View>
      {removeFromCart != null ? (
        <View style={styles.removeContainer}>
          <Pressable style={styles.removeButton} onPress={() => removeFromCart(itemCart)}>
            <Text style={styles.removeButtonText}>X</Text>
          </Pressable>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#666",
    borderWidth: 2.2,
    borderRadius: 10,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    flex: 1,
  },
  details: {
    flex: 3,
    justifyContent: "center",
  },
  priceQuantity: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontSize: 20,
    textAlign: "center",
  },
  quantityView: {
    maxWidth: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    width: "100%",
    alignItems: "center",
  },
  quantityButtons: {
    width: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 17,
    color: "#FFFFFF",
    textAlign: "center",
  },
  quantityText: {
    fontSize: 20,
  },
  text: {
    fontSize: 16.5,
  },
  eventText: {
    fontSize: 16.5,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 16.5,
    marginTop: 5,
  },
  removeContainer: {
    justifyContent: "center",
    marginRight: 10,
  },
  removeButton: {
    width: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
