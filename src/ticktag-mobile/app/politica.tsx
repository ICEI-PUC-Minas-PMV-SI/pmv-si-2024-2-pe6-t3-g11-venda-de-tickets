import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Politica() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>
      <Text style={styles.paragraph}>
        Em nossa empresa, valorizamos e respeitamos sua privacidade. Todos os dados fornecidos em nosso site ou aplicativo são usados exclusivamente para garantir uma experiência segura e personalizada em suas compras de ingressos. As informações coletadas, como nome, e-mail e dados de pagamento, são usadas para processar suas transações, enviar comunicações importantes e oferecer um suporte mais eficiente. Não compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto quando necessário para completar uma transação ou conforme exigido por lei.
      </Text>

      <Text style={styles.subTitle}>Termos de Uso</Text>
      <Text style={styles.paragraph}>
        Ao usar nossa plataforma para comprar ou vender ingressos, você concorda com nossos Termos de Uso. Esses termos garantem uma experiência segura e justa para todos os nossos usuários. Não permitimos a venda de ingressos falsificados, revenda acima do valor original, ou qualquer tipo de prática que possa prejudicar a segurança do evento ou de outros usuários. Reservamo-nos o direito de suspender contas que infrinjam esses termos, protegendo a integridade e a confiabilidade de nossa plataforma.
      </Text>

      <Text style={styles.subTitle}>Políticas de Cancelamento e Reembolso</Text>
      <Text style={styles.paragraph}>
        Entendemos que imprevistos podem acontecer, e estamos aqui para ajudar. Para eventos que permitem cancelamento e reembolso, trabalhamos com políticas transparentes que detalham os prazos e condições para que você possa cancelar sua compra, caso necessário. Em geral, os reembolsos estão sujeitos à aprovação de acordo com as políticas do organizador do evento. Verifique sempre as regras específicas para cada evento antes de finalizar sua compra.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4, // Para Android
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
});
