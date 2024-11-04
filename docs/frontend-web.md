# Front-end Web
[Inclua uma breve descrição do projeto e seus objetivos.]

O aplicativo web de venda de tickets é projetado para proporcionar uma experiência simples e eficiente na compra de ingressos para eventos. O app permitirá que os usuários visualizem eventos disponíveis, selecionem ingressos, realizem pagamentos de forma segura e recebam ingressos digitais. O objetivo é criar uma plataforma responsiva que ofereça uma navegação intuitiva para os compradores de ingressos, além de fornecer ferramentas para os organizadores gerenciarem eventos e acompanhar vendas.

## Tecnologias Utilizadas
[Lista das tecnologias principais que serão utilizadas no projeto.]

- ReactJS: Para a criação de uma interface de usuário dinâmica e interativa.
- Redux: Gerenciamento de estado global da aplicação, facilitando a consistência dos dados.
- Axios: Para realizar requisições HTTP, conectando o front-end à API do backend.
- Material-UI: Para os componentes de interface, garantindo um design moderno e responsivo.
- Styled-Components: Para estilização modular e adaptável dos componentes.
- Stripe/PayPal API: Integração para processamento de pagamentos de forma segura.
- React Router: Para gerenciamento de rotas, facilitando a navegação entre diferentes páginas do app.

## Arquitetura
[Descrição da arquitetura das aplicação web, incluindo os componentes e suas interações.]

A arquitetura será baseada em uma aplicação de página única (SPA), onde as interações principais ocorrerão sem recarregamentos completos de página. As requisições à API para busca de eventos, compra de ingressos e validação de pagamentos serão feitas utilizando Axios. O estado da aplicação será centralizado em Redux, garantindo a sincronia de dados entre componentes e rotas.

## Modelagem da Aplicação
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]

- Eventos: Inclui detalhes como nome, data, local, capacidade, ingressos disponíveis e preço.
- Ingressos: Tipo de ingresso, quantidade disponível, valor unitário e descontos.
- Usuários: Informações dos compradores (nome, e-mail, histórico de compras).
- Pedidos: Detalhes das compras, status de pagamento e geração dos ingressos digitais.

Essas entidades serão representadas como objetos JavaScript manipulados pelo estado da aplicação

## Projeto da Interface Web
[Descreva o projeto da interface Web da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

O projeto da interface será focado na usabilidade e simplicidade. As principais páginas incluem:

Página de Listagem de Eventos: Mostra os eventos disponíveis com informações básicas e opções de filtro.
Página de Detalhes do Evento: Exibe informações detalhadas de um evento específico, tipos de ingressos e preços.
Carrinho de Compras: Resumo dos ingressos selecionados, com opções para modificar quantidades e confirmar a compra.
Página de Pagamento: Formulário para inserção de dados de pagamento com integração segura via Stripe ou PayPal.
Confirmação de Compra: Tela de sucesso com detalhes da compra e acesso aos ingressos digitais.


## Wireframes
[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Página Inicial

![arq](img/home.png)

### Catálogo de Tickets 

Esta é a página de catálogo, onde os usuários podem navegar por diferentes eventos disponíveis para compra de ingressos. Na lateral esquerda, há um painel de filtros para facilitar a pesquisa do usuário. Cada item do catálogo é exibido em formato de card, com uma imagem do evento, título, lotação maxima, status e classificação etária além de endereço data.

![arq](img/catalogo.png)

### Detalhes do Evento

![arq](img/evento.png)

### Registro

![arq](img/registro.png)

### Perfil

![arq](img/perfil.png)

### Contato

![arq](img/contato.png)

### Politicas de Privacidade

![arq](img/politica.png)

## Design Visual
[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

### Layout Responsivo
[Discuta como a interface será adaptada para diferentes tamanhos de tela e dispositivos.]

O layout será projetado para se adaptar a qualquer dispositivo, desde desktops até smartphones. Grid Flexível e Media Queries serão usados para ajustar o conteúdo de acordo com o tamanho da tela, garantindo que o processo de compra seja simples e acessível em dispositivos móveis.

## Interações do Usuário
[Descreva as interações do usuário na interface, como animações, transições entre páginas e outras interações.]

As interações do usuário serão baseadas em transições suaves e feedback visual. Quando um usuário adicionar um ingresso ao carrinho, haverá uma animação sutil indicando a ação bem-sucedida. No processo de pagamento, validações de formulário em tempo real garantirão que os dados sejam inseridos corretamente antes da conclusão.

## Fluxo de Dados
[Diagrama ou descrição do fluxo de dados na aplicação.]

O fluxo de dados seguirá uma arquitetura de ciclo unidirecional, com a aplicação React se comunicando diretamente com a API do back-end para buscar e enviar dados. Ao selecionar um evento, os detalhes dos ingressos serão recuperados via API, permitindo ao usuário selecionar e comprar ingressos em tempo real.

## Requisitos Funcionais
[Liste os principais requisitos funcionais da aplicação.]

Exibir uma lista de eventos com filtros por data, local e tipo de evento.
Permitir a seleção de ingressos e adicionar ao carrinho de compras.

## Requisitos Não Funcionais
[Liste os principais requisitos não funcionais da aplicação, como desempenho, segurança, escalabilidade, etc.]


## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

### 1. Catálogo

### 1.1 Testes Unitários

Teste Cartao Evento:

Este teste assegura que o componente CartaoEvento exibe corretamente as informações principais do evento, incluindo nome, cidade e endereço, na interface do usuário.

![arq](img/CartaoEvento-teste.png)


Teste de Renderização e Interatividade do Componente FiltroEventos:

Este teste verifica se o componente FiltroEventos renderiza corretamente os filtros com seus respectivos rótulos e se chama o método onApply ao clicar no botão de aplicação dos filtros.

![arq](img/FiltroEvento-teste.png)


Teste de Renderização do Componente ListaEventos:

Este teste verifica se o componente ListaEventos renderiza corretamente os cartões de eventos, exibindo informações básicas, como o nome do evento, conforme esperado na interface.

![arq](img/ListaEVentos-teste.png)

Teste de Aplicação de Filtro de Data no Componente Catalogo:

Este teste verifica se o componente Catalogo aplica corretamente um filtro de data, chamando a função fetchPublicData com os parâmetros esperados e exibindo apenas os eventos que correspondem ao filtro aplicado.

![arq](img/Catalogo-teste.png)


### 1.2 Testes de Integração

Teste de Aplicação de Múltiplos Filtros e Resultados no Componente Catalogo.

Esses testes verificam:

A aplicação de múltiplos filtros, como "Classificação de Idade" e "Status", garantindo que fetchPublicData seja chamado com os parâmetros corretos e que os eventos correspondentes sejam exibidos.
O comportamento quando filtros são aplicados sem resultados correspondentes, confirmando que a mensagem "Nenhum evento encontrado" é exibida quando nenhum evento atende aos critérios.

![arq](img/CatalogoX-teste.png)

Teste de Aplicação e Limpeza de Filtros no Componente Catalogo

Este teste valida a funcionalidade de aplicar e limpar filtros no componente `Catalogo`. Ele verifica se, ao aplicar o filtro de "Status" (definido como "ativo"), apenas os eventos correspondentes são exibidos, e se, ao limpar os filtros, todos os eventos retornam à lista. O teste assegura que as chamadas para `fetchPublicData` são feitas com os parâmetros corretos em cada etapa.

![arq](img/CatalogoY.png)

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
