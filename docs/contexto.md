# Introdução

No contexto atual em que a sociedade está, a compra de tickets de maneira virtual se torna essencial, trazendo consigo a necessidade de um sistema robusto que consiga lidar com a alta demanda dos consumidores.

Devido ao aumento de compras de ingressos online a necessidade de se ter um sistema aumenta quando usuários esperam um sistema rápido que não apresente  queda de servidores, travamento e lentidão.

Para enfrentar esses desafios, a arquitetura de software distribuída surge como uma solução poderosa e eficaz. Ao contrário de uma arquitetura centralizada, uma arquitetura distribuída espalha os componentes do sistema por vários servidores e localizações geográficas, escalabilidade e alta disponibilidade. Esses sistemas são projetados para lidar com picos de tráfego e complexidade operacional, assegurando que o sistema continue a funcionar de maneira eficiente mesmo sob condições extremas.

A implementação de uma arquitetura distribuída de  vendas de ticket traz consigo não somente a resolução de problemas comuns da arquitetura centralizada, mas também benefícios como: capacidade de escalar dinamicamente, a redução do risco de falhas catastróficas, a melhoria da experiência do usuário e uma segurança aprimorada nas transações.

Ademais, o mercado de eventos é altamente competitivo, e a qualidade da experiência do usuário é crucial para o sucesso de uma plataforma de venda de ingressos. Com um sistema distribuído, as empresas podem inovar e se adaptar rapidamente às mudanças do mercado, integrando novas funcionalidades, como sistemas de pagamento emergentes, serviços de recomendação personalizados e integrações com redes sociais e plataformas de streaming.

Portanto, adotar uma arquitetura distribuída para a venda de ingresso é uma forma estratégica às necessidades contemporâneas do mercado  Essa abordagem não só suporta grandes volumes de tráfego, mas também posiciona a plataforma como uma solução ágil e preparada para o futuro, capaz de oferecer uma experiência de usuário superior e manter a confiança dos consumidores em um ambiente digital em constante evolução.

## Problema

A sociedade moderna apresenta a crescente adoção da tecnologia para realizar compras e agendamentos online, em que fatores como praticidade, comodidade e competitividade de preços (Gouvêa, Oliveira e Nakagawa, 2013) levam as pessoas a utilizarem o canal online. Esta prática tem relação direta com a alteração dos hábitos de consumo no setor de entretenimento, como a compra de ingressos.  

A tecnologia possibilita que problemas como filas e a necessidade de deslocamento até o ponto de vendas físicos sejam diminuídos, oferecendo vantagens não apenas aos clientes, mas também aos empreendedores, que economizam com a manutenção da infraestrutura e segurança dos locais de venda. 

De acordo com uma pesquisa realizada pela Forbes Brasil em 2023, 63% das pessoas entrevistadas preferem fazer compras em lojas virtuais, com uma tendência de aumento de 54% para o próximo ano, evidenciando que a maior parte dos brasileiros preferem utilizar meios virtuais para suas compras,podendo afetar diretamente as vendas de ingressos de cinema.

## Objetivos

**Geral**: 
  - Desenvolver e implantar um software para a venda de bilhetes de eventos.


**Específicos**:
  - Criar um sistema com interface intuitiva e responsiva para a compra de ingressos de eventos
  - Implementar um sistema de pagamentos com múltiplas formas de pagamento

## Justificativa

É visível o crescimento exponencial de eventos culturais, esportivos, shows dentre outras. Com isso temos a necessidade de um sistema de software que ofereça vantagens significativas, como disponibilidade e escalabilidade, aspectos fundamentais para receber  grandes volumes de  acessos simultâneos.

A venda de tickets também envolve transações financeiras  Uma arquitetura distribuída permite a implementação de medidas de segurança mais robustas, como a segmentação de dados e a aplicação de políticas de segurança.

Em suma, a justificativa para o desenvolvimento de um software de venda de tickets com arquitetura distribuída é a necessidade de atender às demandas crescentes do mercado, garantindo alta disponibilidade, escalabilidade, segurança e uma experiência de usuário superior.  

## Público-Alvo

O público alvo de um sistema de software distribuído é vasto, abrangendo desde organizadores de eventos seja eles: pequeno, médio e grande porte, plataformas que oferecem soluções de venda de ingressos, também inclui empresas de tecnologia que desejam integrar soluções de venda de tickets em seus próprios sistemas, os consumidores finais também são um público importante, pois a experiência do usuário final ao adquirir ingressos, seja através de websites ou aplicativos móveis, deve ser otimizada para garantir uma experiência rápida, segura e sem interrupções.

# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID     | Descrição do Requisito                          | Prioridade |
| ------ | ----------------------------------------------- | ---------- |
| RF-001 | Gestão de usuários (cadastro, login)            | ALTA       |
| RF-002 | Mecanismos de Acesso e Autorização              | ALTA       |
| RF-003 | Mecanismo de Gestão de Compras                  | ALTA       |
| RF-004 | Mecanismo de Gestão de Eventos                  | ALTA       |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                            | Prioridade |
| ------- | ----------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA      |
| RNF-002 | O sistema deve ser capaz de gerir requisições em carga            | ALTA       |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Catálogo de Serviços

Descreva aqui todos os serviços que serão disponibilizados pelo seu projeto, detalhando suas características e funcionalidades.

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d)


## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)
