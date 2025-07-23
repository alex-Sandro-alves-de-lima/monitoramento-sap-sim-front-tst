type Falha = {
  idFalha: string;
  descricao: string;
  data_err?: string;
  totalErros?: string; 
  sap?: boolean;
};

export type Grupo = {
  data_mov: string;
  cod_sistema?: string;
  cod_operacao: string;
  desc_operacao?: string;
  total?: string;
  idMensagem: string;
  loja: string;
  tipo: string;
  data_reg?: string;
  data_env?: string;
  data_int?: string;
  status: string;
  falhaSap?: boolean;
  falhas: Falha[];
};



function gerarDataAleatoriaJulho(): string {
  const dia = Math.floor(Math.random() * 31) + 1;
  const hora = Math.floor(Math.random() * 24);
  const minuto = Math.floor(Math.random() * 60);
  return `${dia.toString().padStart(2, "0")}/07/2025 ${hora
    .toString()
    .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
}

function gerarFalhasAleatoriasSap(): Falha[] {
  const falhasBase: Falha[] = [
    { idFalha: "001", descricao: "Campo & da estrutura & não pode ser inicial", sap: true },
    { idFalha: "002", descricao: "Não é permitido o preenchimento da estrutura & para operação &", sap: true },
    { idFalha: "003", descricao: "Empresa & não existe. Erro estrutura ", sap: true },
    { idFalha: "004", descricao: "Operação Cartão não configurada", sap: true },
    { idFalha: "005", descricao: "Sistema de PDV & não cadastrado (/YSIM/C005). Erro estrutura &", sap: true},
    { idFalha: "006", descricao: "Operação & não configurada", sap: true},
    { idFalha: "007", descricao: " Empresa 0001 não existe. Erro estrutura A000", sap: true},
   
  ];

  const qtd = Math.floor(Math.random() * 5) + 1;
  const falhas: Falha[] = [];

  for (let i = 0; i < qtd; i++) {
    const f = falhasBase[Math.floor(Math.random() * falhasBase.length)];
    const repeticoes = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < repeticoes; j++) {
      falhas.push({
        ...f,
        data_err: `2025-07-${(Math.floor(Math.random() * 28) + 1).toString()
          .padStart(2, "0")} ${Math.floor(Math.random() * 24)    .toString()
          .padStart(2, "0")}:${Math.floor(Math.random() * 60)    .toString()
          .padStart(2, "0")}`,
      });
    }
  }

  return falhas;
}

function gerarFalhasAleatoriasIntegracao(): Falha[] {
  const falhasBase: Falha[] = [
    { idFalha: "001", descricao: "400 Bad Request", sap: false },
    { idFalha: "003", descricao: "Timeout na comunicação", sap: false },
  ];

  const qtd = Math.floor(Math.random() * 5) + 1;
  const falhas: Falha[] = [];

  for (let i = 0; i < qtd; i++) {
    const f = falhasBase[Math.floor(Math.random() * falhasBase.length)];
    const repeticoes = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < repeticoes; j++) {
      falhas.push({
        ...f,
        data_err: `2025-07-${(Math.floor(Math.random() * 28) + 1).toString()
          .padStart(2, "0")} ${Math.floor(Math.random() * 24)    .toString()
          .padStart(2, "0")}:${Math.floor(Math.random() * 60)    .toString()
          .padStart(2, "0")}`,
      });
    }
  }

  return falhas;
}

function gerarGruposExtras(quantidade: number): Grupo[] {
  const lojas = ["1302", "1200", "0001"];
  const operacoes = Object.keys(EOperacao);
  const tipos = ["Venda", "Sangria", "Forma de pagamento"];
  const status = ["1", "3", "4"];

  const grupos: Grupo[] = [];

  for (let i = 0; i < quantidade; i++) {
    const loja = lojas[Math.floor(Math.random() * lojas.length)];
    const cod_operacao = operacoes[Math.floor(Math.random() * operacoes.length)];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const data_mov = gerarDataAleatoriaJulho();
    const idMensagem = `GRP_MOCK_${i.toString().padStart(3, "0")}`;
    const St= status[Math.floor(Math.random() * status.length)];

    grupos.push({
      idMensagem,
      cod_operacao,
      tipo,
      loja,
      data_mov,
      data_reg: data_mov,
      data_env: data_mov,
      data_int: data_mov,
      status: String(St),
      falhas: St === "4" ? gerarFalhasAleatoriasSap().filter((e)=> e.sap === true) : gerarFalhasAleatoriasIntegracao().filter((e)=> e.sap === false),
    });
  }

  return grupos;
}



export const EOperacao: Record<string, string> = {
  "1001": "NFCe Venda",
  "1002": "Devolução da Venda (Anulado)",
  "0101": "Sangria Venda",
  "0104": "Sangria Agrupamento",
  "0105": "Sangria Venda (Valores menores agrupados)",
  "1006": "Recarga de Celular - Venda",
  "1007": "Recarga de Celular - Cancelamento",
  "1008": "Doação de Troco - Venda",
  "1009": "Doação de Troco - Cancelamento",
  "1010": "Gift Card - Venda",
  "1011": "Gift Card - Cancelamento",
  "1012": "Pagamento de Fatura FIC - Venda",
  "1013": "Pagamento de Fatura FIC - Cancelamento",
  "1014": "Controle de Suprimento de Troco",
  "1015": "Pedido antecipação",
  "1016": "Cancelamento pedido antecipação",
  "1017": "Movimento Financeiro Dinheiro achado loja",
  "1018": "NFe",
  "1019": "MF-e/SAT",
};

export const gruposMock: Grupo[] = [
  {
    idMensagem: "GRP001",
    cod_operacao: "1001",
    tipo: "Forma de pagamento",
    loja: "1302",
    data_mov: "01/07/2025 14:00",
    data_reg: "2025-05-28 11:30",
    data_env: "2025-05-28 11:30",
    data_int: "2025-05-28 11:30",
    falhaSap: true,
    status: "4",
    falhas: [
      {
        idFalha: "001",
        descricao: "Campo & da estrutura & não pode ser inicial",
      },
      {
        idFalha: "001",
        descricao: "Venda já foi integrada",
      },
        {
        idFalha: "001",
        descricao: "Venda já foi integrada",
      },
        {
        idFalha: "001",
        descricao: "Venda já foi integrada",
      },
      {
        idFalha: "003",
        descricao: "Operação & não configurada",
      },
      {
        idFalha: "004",
        descricao: "Estrutura & não configurada",
      },
      {
        idFalha: "005",
        descricao: "Preenchimento da estrutura & é obrigatório para operação &",
      },
      {
        idFalha: "006",
        descricao:
          "Não é permitido o preenchimento da estrutura & para operação &",
      },
      {
        idFalha: "007",
        descricao: "Empresa & não existe. Erro estrutura &",
      },
      {
        idFalha: "008",
        descricao: "Centro & não existe. Erro estrutura &",
      },
      {
        idFalha: "009",
        descricao:
          "Sistema de PDV & não cadastrado (/YSIM/C005). Erro estrutura &",
      },
    ],
  },
  {
    idMensagem: "GRP003",
    cod_operacao: "1001",
    tipo: "Venda",
    loja: "1302",
    data_mov: "01/07/2025 14:00",
    data_reg: "2025-05-28 11:30",
    data_env: "2025-05-28 11:30",
    data_int: "2025-05-28 11:30",
    status: "3",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data_err: "2025-05-27 17:46",
      },
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data_err: "2025-05-27 17:46",
      },
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data_err: "2025-05-27 17:46",
      },
    ],
  },
  {
    idMensagem: "GRP006",
    cod_operacao: "0101",
    tipo: "Venda",
    loja: "1302",
    data_mov: "01/07/2025 14:00",
    data_reg: "2025-05-28 11:30",
    data_env: "2025-05-28 11:30",
    data_int: "2025-05-28 11:30",
    status: "3",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data_err: "2025-05-27 17:46",
      },
    ],
  },
  {
    idMensagem: "GRP007",
    cod_operacao: "0101",
    tipo: "Sangria",
    loja: "1302",
    data_mov: "01/07/2025 14:00",
    data_reg: "2025-05-28 11:30",
    data_env: "2025-05-28 11:30",
    data_int: "2025-05-28 11:30",
    status: "1",
    falhas: [
      {
        idFalha: "F002-A",
        descricao: "Timeout na requisição",
        data_err: "2025-05-27 17:46",
      },
    ],
  },
];

export function parseGruposMock(): Grupo[] {
  return gruposMock.map((item: Grupo) => {
    const falhasMap = item.falhas.reduce((acc: Record<string, any>, f: any) => {
      if (!acc[f.idFalha]) {
        acc[f.idFalha] = {
          idFalha: f.idFalha,
          descricao: f.descricao,
          data_err: f.data_err,
          totalErros: 1,
        };
      } else {
        acc[f.idFalha].totalErros += 1;
      }
      return acc;
    }, {});
    const falhasAgrupadas = Object.values(falhasMap);
    const totalFalhas = falhasAgrupadas.reduce(
      (total, falha) => total + falha.totalErros,
      0
    );
    return {
      ...item,
      desc_operacao: EOperacao[item.cod_operacao] || "Tipo desconhecido",
      data_reg: item.data_mov,
      data_env: item.status === "1"? item.data_mov:"",
      data_int: item.status === "1"? item.data_mov:"",
      usuario: item.status === "1"? "TC021864":"",
      total: totalFalhas,
      falhas: falhasAgrupadas,
    }
  }).sort((a, b) => a.data_mov.localeCompare(b.data_mov))
}

gruposMock.push(...gerarGruposExtras(30));
export const gruposMocks = parseGruposMock();
