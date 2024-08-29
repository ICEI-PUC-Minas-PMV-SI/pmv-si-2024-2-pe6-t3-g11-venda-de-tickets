# Introdução

A transformação digital tem sido uma força motriz na modernização da sociedade, especialmente no que diz respeito às compras e agendamentos online. Fatores como praticidade, comodidade e competitividade de preços são os principais impulsionadores dessa tendência, atraindo um número crescente de consumidores para o ambiente digital (Gouvêa, Oliveira e Nakagawa, 2013). No setor de entretenimento, essa mudança é particularmente evidente na compra de ingressos para eventos, onde a demanda por soluções ágeis e eficientes tem se intensificado.

A evolução tecnológica não apenas minimiza problemas tradicionais, como longas filas e a necessidade de deslocamento até pontos de venda físicos, mas também oferece uma série de vantagens tanto para os consumidores quanto para os empreendedores. Para os clientes, a conveniência de adquirir ingressos de forma rápida e segura, a qualquer hora e de qualquer lugar, é um diferencial significativo. Já para os empreendedores, o uso de plataformas digitais permite a redução substancial de custos operacionais, associados à manutenção de infraestrutura física e à segurança nos pontos de venda.

Além disso, o avanço das tecnologias de processamento e distribuição de dados, como computação em nuvem e arquiteturas escaláveis, tem possibilitado que plataformas de vendas online suportem um grande volume de transações simultâneas, garantindo uma experiência fluida e sem interrupções para o usuário final. Isso é crucial em períodos de alta demanda, como a venda de ingressos para grandes shows ou eventos esportivos, onde o tempo de resposta e a disponibilidade do serviço são fatores críticos para o sucesso.

Dados de uma pesquisa da Forbes Brasil em 2023 indicam que 63% dos entrevistados já preferem realizar compras em lojas virtuais, com uma projeção de crescimento de 54% para o ano seguinte. Esses números refletem a crescente confiança dos brasileiros nos meios digitais, o que deverá impactar significativamente as vendas de ingressos para eventos. Com a expectativa de que essa preferência continue a crescer, é essencial que plataformas de venda de ingressos estejam preparadas para atender à demanda crescente, garantindo uma experiência de compra eficiente e confiável.

- [Procura recorde por ingressos de tour de Taylor Swift faz Ticketmaster cancelar vendas](https://www.cnnbrasil.com.br/entretenimento/procura-recorde-por-ingressos-de-tour-de-taylor-swift-faz-ticketmaster-cancelar-vendas/)

- [Rock in Rio 2024: ingressos da pré-venda esgotam em tempo recorde](https://cultura.uol.com.br/entretenimento/noticias/2024/05/20/10343_rock-in-rio-2024-ingressos-na-pre-venda-esgotam-em-tempo-recorde.html)

## Problema

O aumento exponencial na realização de eventos culturais, esportivos, shows e outras atividades de entretenimento tem gerado uma demanda crescente por sistemas de venda de ingressos online. Com essa expansão, surge a necessidade de desenvolver soluções de software que possam garantir vantagens significativas, como alta disponibilidade e escalabilidade. Esses aspectos são cruciais para assegurar que a plataforma possa lidar eficientemente com grandes volumes de acessos simultâneos, especialmente durante períodos de alta demanda, como a abertura de vendas para eventos populares.

A indisponibilidade ou lentidão em sistemas de vendas online pode resultar em perda de receita, insatisfação do cliente e até mesmo danos à reputação da empresa. Portanto, a capacidade de escalar recursos de maneira dinâmica, para atender a picos de tráfego, e garantir a continuidade do serviço sem interrupções, é fundamental. Além disso, a implementação de estratégias de balanceamento de carga e redundância pode ajudar a distribuir o tráfego de maneira eficiente, minimizando o risco de sobrecarga e falhas no sistema.

Esses desafios evidenciam a importância de uma arquitetura de software robusta e flexível, capaz de atender às exigências de um mercado em constante crescimento e evolução.

## Objetivos

**Geral**: 
  - Desenvolver uma plataforma de venda de tickets online eficiente e escalável que permita a compra e gerenciamento de ingressos para eventos culturais, esportivos e de entretenimento, oferecendo uma experiência de usuário intuitiva e segura.

**Específicos**:
  - Implementar um sistema de balanceamento de carga e escalabilidade que permita à aplicação gerenciar grandes volumes de acessos simultâneos, garantindo desempenho consistente e alta disponibilidade durante períodos de alta demanda.
  - Implementar um design responsivo e adaptativo que proporcione uma experiência de usuário otimizada em dispositivos móveis e desktops, garantindo que a aplicação seja totalmente funcional e visualmente atraente em diferentes tamanhos de tela e resoluções.

## Justificativa

A escolha de desenvolver uma aplicação de venda de tickets online é motivada pela crescente demanda por soluções tecnológicas que acompanhem a evolução do mercado de entretenimento. Com o aumento significativo na realização de eventos culturais, esportivos e shows, as plataformas de venda de ingressos enfrentam desafios crescentes relacionados à escalabilidade, disponibilidade e experiência do usuário. A transformação digital trouxe novas expectativas por parte dos consumidores, que agora exigem processos de compra rápidos, seguros e acessíveis a qualquer momento e de qualquer lugar.

Trabalhar com essa aplicação específica é essencial não apenas para atender às demandas atuais, mas também para preparar o sistema para o futuro, onde o volume de transações online tende a crescer ainda mais. A implementação de uma arquitetura de software que possa escalar eficientemente e garantir alta disponibilidade é fundamental para evitar perdas financeiras e manter a satisfação do cliente. Além disso, focar em aspectos como a otimização de desempenho, segurança de dados e facilidade de uso são pilares que sustentam o sucesso de qualquer plataforma digital de vendas.

Ao aprofundar o desenvolvimento em áreas específicas, como a implementação de mecanismos de balanceamento de carga e a utilização de infraestruturas em nuvem, busca-se não apenas criar uma solução eficiente, mas também oferecer uma experiência superior ao usuário final. Essas escolhas são impulsionadas pela necessidade de inovar e garantir que a plataforma possa competir em um mercado cada vez mais competitivo, onde a capacidade de atender grandes volumes de acessos simultâneos pode ser o diferencial entre o sucesso e o fracasso.

A justificativa para esse projeto está enraizada na importância de criar uma solução robusta e escalável, capaz de atender tanto às necessidades imediatas quanto às futuras, proporcionando um serviço confiável e de alta qualidade para os usuários. Ao investir nesse desenvolvimento, estamos não apenas acompanhando as tendências do mercado, mas também contribuindo para a evolução tecnológica e a melhoria contínua das plataformas de vendas online.

## Público-Alvo

O público-alvo desta aplicação de venda de tickets online abrange tanto consumidores finais quanto organizadores de eventos. Entre os consumidores, estão pessoas de diferentes faixas etárias e perfis que buscam adquirir ingressos de forma rápida, segura e conveniente, seja para shows, eventos esportivos, peças de teatro ou qualquer outro tipo de evento. Esses usuários valorizam a praticidade de realizar compras online, especialmente em plataformas que ofereçam uma experiência de usuário intuitiva e eficiente.

Além dos consumidores, a aplicação também é direcionada a organizadores e promotores de eventos que necessitam de uma solução robusta para gerenciar a venda de ingressos e lidar com grandes volumes de acessos simultâneos, garantindo que seus eventos sejam bem-sucedidos e acessíveis a um público amplo. Este grupo busca ferramentas confiáveis e escaláveis que possam facilitar o processo de venda e maximizar a satisfação dos seus clientes.

# Especificações do Projeto

## Requisitos

### Requisitos Funcionais

| ID     | Descrição do Requisito                          | Prioridade | Responsável(eis)|
| ------ | ----------------------------------------------- | ---------- | --------------- |
| RF-001 | Gestão de usuários                              | ALTA       ||
| RF-002 | Mecanismos de Gestão de Relatórios              | ALTA       ||
| RF-003 | Mecanismo de Gestão de Compras                  | ALTA       ||
| RF-004 | Mecanismo de Gestão de Eventos                  | ALTA       ||

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                                                                                    | Prioridade |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | A aplicação deve ser capaz de escalar horizontalmente para lidar com grande volume de requisições.                                        | ALTA       |
| RNF-002 | A aplicação deve garantir uma alta disponibilidade, com um tempo de funcionamento de no mínimo 99,9%.                                     | ALTA       |
| RNF-003 |A aplicação deve ser otimizada para proporcionar tempos de resposta rápidos, com um tempo de carregamento de página inferior a 2 segundos. | ALTA       |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                                           |
|--|-------------------------------------------------------------------- |
|01| Consumo de APIs de pagamentos para validações de vendas             |
|02| A aplicação deve ser hospedada em uma infraestrutura de nuvem       |

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
