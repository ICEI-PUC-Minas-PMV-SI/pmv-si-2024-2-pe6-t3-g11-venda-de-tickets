# TickTag

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Arquitetura de Sistemas Distribuídos`

`SEMESTRE: 6º`

O projeto consiste no desenvolvimento de uma plataforma online para a venda de tickets, voltada a eventos culturais, esportivos e de entretenimento. A aplicação busca oferecer uma experiência intuitiva e segura, permitindo aos usuários realizar a compra e o gerenciamento de ingressos de forma prática e confiável.

Para atender a altos volumes de acessos simultâneos, a plataforma será construída com um sistema de balanceamento de carga e escalabilidade, garantindo desempenho consistente e alta disponibilidade, mesmo durante picos de demanda. Além disso, contará com um design responsivo e adaptativo, proporcionando uma experiência otimizada tanto em dispositivos móveis quanto em desktops, com interfaces funcionais e visualmente atrativas em diferentes tamanhos de tela e resoluções.

## Integrantes

* Joao Gabriel Alves
* Joao Victor dos Anjos Sales
* Jonatas Fernandes Ferreira
* Kelly Marques
* Marco Willy Azevedo Gomes
* Thiago Vinicius Costa Guimaraes

## Orientador

* Kleber Jacques Ferreira de Souza

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Documentação de Contexto](docs/contexto.md) <br> |
| ETAPA 2         |[Planejar, desenvolver e gerenciar APIs e Web Services](docs/backend-apis.md) <br> |
| ETAPA 3         |[Planejar, desenvolver e gerenciar uma aplicação Web](docs/frontend-web.md) |
| ETAPA 4        |[Planejar, desenvolver e gerenciar uma aplicação Móvel](docs/frontend-mobile.md) <br>  |
| ETAPA 5         | [Apresentação](presentation/README.md) |


## Instruções de utilização

### Pré-requisitos  
Certifique-se de que os seguintes itens estão instalados em sua máquina:  
- **Node.js** (v16 ou superior) e **npm** (ou **yarn**)  
- **Java** (JDK 17 ou superior)  
- **PostgreSQL** (versão 13 ou superior)  
- **Expo CLI** (para executar o aplicativo mobile)  
- **Git** (para clonar os repositórios do projeto)  

---

### Configuração do Backend  
1. Clone o repositório do backend:  
   ```bash  
   git clone https://github.com/sales-victor/TickTag.git 
   cd TickTag  
   ```  

2. Instale as dependências do projeto:  
   - Certifique-se de que o **Lombok** está configurado no IDE.  

3. Configure o banco de dados no arquivo `application.properties`:  
   ```properties  
   spring.datasource.url=jdbc:postgresql://localhost:5432/ticktag 
   spring.datasource.username=postgres 
   spring.datasource.password=753941 
   ```  

4. Execute a aplicação:  
   ```bash  
   ./mvnw spring-boot:run  
   ```  

---

### Configuração do Frontend Web  
1. Clone o repositório do frontend web:  
   ```bash  
   git clone https://github.com/ThiagoVini13/ticktag-frontend.git  
   cd ticktag-frontend  
   ```  

2. Instale as dependências:  
   ```bash  
   npm install  
   ```  

3. Execute a aplicação em modo de desenvolvimento:  
   ```bash  
   npm start  
   ```  

---

### Configuração do Frontend Mobile  
1. Clone o repositório do frontend mobile:  
   ```bash  
   git clone https://github.com/sales-victor/ticktag-mobile.git 
   cd ticktag-mobile
   ```  

2. Instale as dependências:  
   ```bash  
   npm install  
   ```  

3. Inicie o Expo Go:  
   ```bash  
   expo start  
   ```  

4. Abra o aplicativo **Expo Go** no dispositivo móvel e escaneie o QR Code gerado no terminal ou na interface web do Expo.  

# Código

<li><a href="https://github.com/sales-victor/TickTag">Back-end</a></li>
li><a href="https://github.com/ThiagoVini13/ticktag-frontend">Front-end</a></li>
li><a href="https://github.com/sales-victor/ticktag-mobile">Mobile</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
