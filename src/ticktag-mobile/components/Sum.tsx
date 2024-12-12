import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

interface SumI {
  calculateTotal: () => number;
}

export default function Sum({ calculateTotal }: SumI) {
  const router = useRouter();

  const handlePayment = () => {
    if (calculateTotal() !== 0) {
      alert("Redirecionando para a página de pagamento...");
      setTimeout(() => {
        router.push("/payment");
      }, 2000);
    } else {
      alert("Nenhum item no carrinho selecionado");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.valueText}>R$ {calculateTotal().toFixed(2)}</Text>
        <Text style={{ textAlign: "center" }}>ou 10x de R$ {(calculateTotal() / 10).toFixed(2)}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: "center",
  },
  valueText: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  buttonView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
