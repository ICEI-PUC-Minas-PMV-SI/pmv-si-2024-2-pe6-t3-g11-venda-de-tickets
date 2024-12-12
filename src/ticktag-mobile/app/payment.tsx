import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { fetchData, updateData } from "@/services/apiService";
import { CarrinhoI, ItemCarrinhoI } from "@/constants/CartTypes";
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const defaultCart: CarrinhoI = {
  id: 0,
  itensCarrinho: [],
  usuario: {
    cpf: "",
    dataNascimento: "",
    email: "",
    id: 0,
    nome: "",
    telefone: "",
  },
};

export default function Pagamento() {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [carrinho, setCarrinho] = useState<CarrinhoI>(defaultCart);
  const [itensCarrinho, setItensCarrinho] = useState<Array<ItemCarrinhoI>>([]);
  const [progress, setProgress] = useState(0);
  const [pagamento, setPagamento] = useState("pendente");
  const router = useRouter();
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
        const response = await updateData(`carrinho/comprar/${carrinho.id}`, carrinho);

        if (response.statusCode === 200) {
          setTimeout(() => {
            router.push("/tickets");
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
    const response = await fetchData(`carrinho/usuario?email=thiago7313vini@gmail.com`);
    // const response = await fetchData(`carrinho/usuario?email=${localStorage.getItem("email")}`);

    if (response.statusCode !== 200) {
      throw new Error("Erro ao pegar itens do carrinho");
    } else {
      setCarrinho(response.data);
      setItensCarrinho(response.data.itensCarrinho);
    }
  };

  const calculateTotal = () => {
    let soma = 0.0;
    if (itensCarrinho.length > 0) {
      for (const item of itensCarrinho) {
        if (item.status === "PENDENTE") {
          let itemValor = item.tipoTicket.valorTicket * item.quantidade;
          soma += itemValor;
        }
      }
    }
    return soma;
  };

  const handleCardPayment = (e: GestureResponderEvent) => {
    e.preventDefault();
    calculateProgress();
  };

  const handlePixPayment = (e: GestureResponderEvent) => {
    e.preventDefault();
    calculateProgress();
  };

  const handleCancel = () => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const progressBar = () => {
    let element;
    if (progress === 0) {
      element = <></>;
    } else if (progress < 100 && progress !== 0) {
      element = (
        <View className="progress-bar container">
          <View className="loading-bar" style={{ width: `${progress}%` }} />
        </View>
      );
    } else {
      element = (
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "green", textAlign: "center" }}>
          Pagamento aprovado, redirecionando para a tela de tickets
        </Text>
      );
    }
    return element;
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Pagamento</Text>
      <Text style={styles.secondaryText}>Escolha uma forma de pagamento</Text>

      <View style={styles.paymentTabs}>
        <Pressable onPress={() => setPaymentMethod("pix")}>
          <Text style={styles.paymentMethText}>PIX</Text>
        </Pressable>
      </View>
      <View style={styles.paymentTabs}>
        <Pressable onPress={() => setPaymentMethod("credit-card")}>
          <Text style={styles.paymentMethText}>Cartão de Crédito</Text>
        </Pressable>
      </View>

      <View style={styles.paymentMethods}>
        <View style={styles.creditCardContainer}>
          {paymentMethod === "credit-card" && (
            <>
              <Text style={styles.labels}>Informações do Cartão</Text>
              <View style={styles.cardInputsView}>
                <TextInput
                  style={styles.cardInputs}
                  id="card-number"
                  placeholder="1234 4567 8912 3456"
                  maxLength={16}
                />
              </View>

              <View style={styles.dateCvvView}>
                <View style={{ flex: 1 }}>
                  <View style={styles.cardInputsView}>
                    <TextInput style={styles.cardInputs} id="card-expiry" maxLength={5} placeholder="MM/AA" />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.cardInputsView}>
                    <TextInput style={styles.cardInputs} id="card-cvc" maxLength={4} placeholder="CVV" />
                  </View>
                </View>
              </View>

              {progressBar()}
            </>
          )}
        </View>

        <View style={styles.pixContainer}>
          {paymentMethod === "pix" && (
            <>
              <Text style={styles.labels}>Pagamento via PIX</Text>
              <View style={styles.pixPaymentView}>
                <QRCode value={pix} size={154} />
                {progressBar()}
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.valueText}>R$ {calculateTotal().toFixed(2)}</Text>
          <Text style={{ marginLeft: 10, textAlign: "center" }}>
            ou 10x de R$ {(calculateTotal() / 10).toFixed(2)}
          </Text>
        </View>

        <View style={{ flexDirection: "column", alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
          <>
            {paymentMethod == "pix" ? (
              <View style={styles.paymentView}>
                <Pressable onPress={handlePixPayment}>
                  <Text style={styles.confirmText}>Confirmar Compra</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={handleCardPayment}>
                <Text style={styles.confirmText}>Confirmar Compra</Text>
              </Pressable>
            )}
          </>

          <View style={styles.paymentView}>
            <Pressable onPress={handleCancel}>
              <Text style={styles.confirmText}>Cancelar Compra</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
  },
  mainText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 16,
    marginLeft: 10,
  },
  paymentTabs: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#BEB9B3",
    borderRadius: 10,
  },
  paymentMethText: {
    fontSize: 20,
    padding: 10,
  },
  creditCardContainer: {
    backgroundColor: "#99E1D9",
    borderRadius: 10,
  },
  paymentMethods: {
    margin: 10,
  },
  cardInputsView: {
    backgroundColor: "#5D576B",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  labels: {
    fontSize: 20,
    fontWeight: "500",
    margin: 10,
    textAlign: "center",
  },
  cardInputs: {
    color: "#99E1D9",
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
  },
  dateCvvView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pixContainer: {
    borderRadius: 10,
    alignItems: "center",
  },
  pixPaymentView: {
    marginBottom: 10,
  },
  paymentView: {
    backgroundColor: "#5D576B",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 6,
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  confirmText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  orderDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  valueText: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: "center",
  },
});
