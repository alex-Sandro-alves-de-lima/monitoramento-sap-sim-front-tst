export interface IRede {
  idVinculado?: string;
  idRede: string;
  descricao: string;
  listBandeira?: IListBandeiraFormValues[];
  date_create?: string;
  date_update?: string;
  status?:boolean | true;
  user?: string; 
  migrado?: boolean;
  cancelamento?: string;
}
export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
  date_create?: string;
  date_update?: string;
}

export const dados: IRede[] = [
  {
    idRede: "012",
    descricao: "BRASILCARD ",
    idVinculado: "",
    listBandeira: [
      { descricaoBandeira: "CIELO ALIMENTAÇÃO", idBandeira: "015" },
    ],
    status: false,
    date_create: "02/06/2025 10:00",
    date_update: "03/06/2025 11:50",
  },
  {
    idRede: "015",
    descricao: "VOLUS ",
    listBandeira: [
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "016",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "017",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "018",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "019",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "020",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricaoBandeira: "CIELO ALIMENTAÇÃO",
        idBandeira: "021",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
    ],
    date_create: "02/06/2025 10:00",
    date_update: "02/06/2025 10:00",
  },
  { idRede: "013", descricao: "SYSDATA " },
  { idRede: "041", descricao: "REDECOMPRAS " },
  { idRede: "071", descricao: "ECXCARD " },
  { idRede: "073", descricao: "GETNET " },
  { idRede: "086", descricao: "VALESHOP " },
  { idRede: "090", descricao: "GWCEL " },
  { idRede: "094", descricao: "NEUS " },
  { idRede: "095", descricao: "CREDI-SHOP " },
  { idRede: "102", descricao: "CIELO " },
  { idRede: "103", descricao: "REDE " },
  { idRede: "105", descricao: "REDESOFTNEX " },
  { idRede: "108", descricao: "GETNETLAC " },
  { idRede: "109", descricao: "USECRED " },
  { idRede: "113", descricao: "SISCRED " },
  { idRede: "146", descricao: "TELENET " },
  { idRede: "157", descricao: "TICKETLOG " },
  { idRede: "158", descricao: "TODO-CARTOES " },
  { idRede: "160", descricao: "PAGBANK " },
  { idRede: "170", descricao: "SEICON " },
  { idRede: "172", descricao: "SENFF-EMV " },
  { idRede: "173", descricao: "ALGORIX-EMV " },
  { idRede: "176", descricao: "SOLUCARD " },
  { idRede: "057", descricao: "BANESE " },
  { idRede: "174", descricao: "BKBANK " },
  { idRede: "075", descricao: "FIC " },
  { idRede: "164", descricao: "PICPAY " },
  { idRede: "028", descricao: "UPBRASIL " },
  { idRede: "165", descricao: "RAPPI " },
  { idRede: "177", descricao: "STIX SNC " },
  { idRede: "045", descricao: "INCOMM " },
];