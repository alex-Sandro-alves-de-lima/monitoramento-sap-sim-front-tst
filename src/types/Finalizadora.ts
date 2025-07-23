export type IFinalizadora = {
  id: string;
  cod_int_sap_sim: string;
  tipoFinalizadora?: string;
  desc_finalizadora?: string;
  combinacoes?: Combinacao[];
  finalizadora?: Finalizadora;
  tipo_crtl?: string;
  ind_status: boolean;
  data_cadastro?: string;
  data_ultima_modificacao?: string;
  user_id_mod?: string;
  cod_rede?: string,
  cod_bandeira?: string,
  descCod?: string
  cod_finalizadora: string
};

type Combinacao = {
  cod_rede?: string;
  cod_bandeira?: string;
};

type Finalizadora = {
  descricao?: string;
  id: string;
  status?: boolean;
  descCod?: string;
};

export const dadosFinalizadora : IFinalizadora[]=[
  {
    cod_finalizadora: "10",
    cod_bandeira: "015",
    cod_rede: "020",
    ind_status: true,
    id: "0",
    cod_int_sap_sim: "1000"
  }
]


export interface ITipoFinalizadoraFormValues {
  id: string;
  idTipo: string;
  descricao: string;
  descCod: string;
  status: boolean;
}

export const dados: ITipoFinalizadoraFormValues[] = [
  {
    descricao: "Cartão",
    id: "2",
    idTipo: "2",
    status: false,
    descCod: "Rede/Bandeira",
  },
  {
    descricao: "Pix",
    id: "0",
    idTipo: "1",
    descCod: "Código finalizadora",
    status: true,
  },
    {
    descricao: "CARTEIRA VIRTUAL ",
    id: "3",
    idTipo: "1",
    descCod: "Código finalizadora",
    status: true,
  },
    {
    descricao: "OUTROS",
    id: "4",
    idTipo: "1",
    descCod: "Código finalizadora",
    status: true,
  },
    {
    descricao: "PIX ECOM",
    id: "5",
    idTipo: "1",
    descCod: "Código finalizadora",
    status: true,
  },
];

export interface tipoFinalizadoraFormProps {
  initialValues?: ITipoFinalizadoraFormValues;
  loading?: boolean;
}
