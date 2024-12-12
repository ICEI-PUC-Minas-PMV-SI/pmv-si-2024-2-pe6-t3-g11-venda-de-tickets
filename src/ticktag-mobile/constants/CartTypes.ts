export interface EnderecoI {
  bairro: string;
  cidade: string;
  complemento: string;
  id: number;
  idEvento: number;
  nomeEspaco: string;
  nomeLogradouro: string;
  numero: number;
  tipoLogradouro: string;
  uf: string;
}

interface TicketI {
  id: number;
  idEvento: number;
  lote: number;
  qtdLote: number;
  statusTicket: string;
  tickets: [];
  tipoTicket: string;
  valorMeiaTicket: number;
  valorTicket: number;
}

interface EventoI {
  baseImagem: string;
  capaEvento: ArrayBuffer;
  classificacaoIdade: string;
  dataEvento: string;
  endereco: EnderecoI;
  id: number;
  lotacaoMaxima: number;
  nomeEvento: string;
  statusEvento: string;
  tickets: TicketI[];
}

interface TipoTicketI {
  id: number;
  idEvento: number;
  lote: number;
  qtdLote: number;
  statusTicket: string;
  tickets: TicketI[];
  tipoTicket: string;
  valorMeiaTicket: number;
  valorTicket: number;
}

interface UsuarioI {
  cpf: string;
  dataNascimento: string;
  email: string;
  id: number;
  nome: string;
  telefone: string;
}

export interface ItemCarrinhoI {
  id?: number;
  evento: EventoI;
  quantidade: number;
  status: string;
  tipoTicket: TipoTicketI;
}

export interface CarrinhoI {
  id: number;
  itensCarrinho: ItemCarrinhoI[];
  usuario: UsuarioI;
}