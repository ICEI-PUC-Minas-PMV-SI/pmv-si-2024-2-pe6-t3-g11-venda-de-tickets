import React from 'react';
import './Politica.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Politica() {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Política de Privacidade</h2>
      <p>
        Em nossa empresa, valorizamos e respeitamos sua privacidade. Todos os dados fornecidos em nosso site ou aplicativo são usados exclusivamente para garantir uma experiência segura e personalizada em suas compras de ingressos. As informações coletadas, como nome, e-mail e dados de pagamento, são usadas para processar suas transações, enviar comunicações importantes e oferecer um suporte mais eficiente. Não compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto quando necessário para completar uma transação ou conforme exigido por lei.
      </p>
      
      <h3>Termos de Uso</h3>
      <p>
        Ao usar nossa plataforma para comprar ou vender ingressos, você concorda com nossos Termos de Uso. Esses termos garantem uma experiência segura e justa para todos os nossos usuários. Não permitimos a venda de ingressos falsificados, revenda acima do valor original, ou qualquer tipo de prática que possa prejudicar a segurança do evento ou de outros usuários. Reservamo-nos o direito de suspender contas que infrinjam esses termos, protegendo a integridade e a confiabilidade de nossa plataforma.
      </p>
      
      <h3>Políticas de Cancelamento e Reembolso</h3>
      <p>
        Entendemos que imprevistos podem acontecer, e estamos aqui para ajudar. Para eventos que permitem cancelamento e reembolso, trabalhamos com políticas transparentes que detalham os prazos e condições para que você possa cancelar sua compra, caso necessário. Em geral, os reembolsos estão sujeitos à aprovação de acordo com as políticas do organizador do evento. Verifique sempre as regras específicas para cada evento antes de finalizar sua compra.
      </p>
    </div>
  );
}

export default Politica;
