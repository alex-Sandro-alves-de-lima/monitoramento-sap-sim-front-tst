export interface IBandeira {
  idVinculado?: string;
  idBandeira: string;
  descricao: string;
  listRede?: IListRedeFormValues[];
  date_create?: string;
  date_update?: string;
  status?: boolean | true;
  user?: string;
}
export interface IListRedeFormValues {
  idRede: string;
  descricao: string;
  date_create?: string;
  date_update?: string;
}

export const dados: IBandeira[] = [
  {
    idBandeira: "012",
    descricao: "BRASILCARD ",
    idVinculado: "",
    status: false,
    user: "TC021864",
    listRede: [{ descricao: "CIELO ALIMENTAÇÃO", idRede: "015" }],
    date_create: "02/06/2025 10:00",
    date_update: "03/06/2025 11:50",
  },
  {
    idBandeira: "015",
    descricao: "VOLUS ",
    status: false,
    user: "TC021864",
    listRede: [
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "016",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "017",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "018",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "019",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "020",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
      {
        descricao: "CIELO ALIMENTAÇÃO",
        idRede: "021",
        date_create: "02/06/2025 10:00",
        date_update: "03/06/2025 11:50",
      },
    ],
    date_create: "02/06/2025 10:00",
    date_update: "02/06/2025 10:00",
  },
  { idBandeira: "013", descricao: "SYSDATA " },
  { idBandeira: "041", descricao: "BandeiraCOMPRAS " },
  { idBandeira: "071", descricao: "ECXCARD " },
  { idBandeira: "073", descricao: "GETNET " },
  { idBandeira: "086", descricao: "VALESHOP " },
  { idBandeira: "090", descricao: "GWCEL " },
  { idBandeira: "094", descricao: "NEUS " },
  { idBandeira: "095", descricao: "CREDI-SHOP " },
  { idBandeira: "102", descricao: "CIELO " },
  { idBandeira: "103", descricao: "Bandeira " },
  { idBandeira: "105", descricao: "BandeiraSOFTNEX " },
  { idBandeira: "108", descricao: "GETNETLAC " },
  { idBandeira: "109", descricao: "USECRED " },
  { idBandeira: "113", descricao: "SISCRED " },
  { idBandeira: "146", descricao: "TELENET " },
  { idBandeira: "157", descricao: "TICKETLOG " },
  { idBandeira: "158", descricao: "TODO-CARTOES " },
  { idBandeira: "160", descricao: "PAGBANK " },
  { idBandeira: "170", descricao: "SEICON " },
  { idBandeira: "172", descricao: "SENFF-EMV " },
  { idBandeira: "173", descricao: "ALGORIX-EMV " },
  { idBandeira: "176", descricao: "SOLUCARD " },
  { idBandeira: "057", descricao: "BANESE " },
  { idBandeira: "174", descricao: "BKBANK " },
  { idBandeira: "075", descricao: "FIC " },
  { idBandeira: "164", descricao: "PICPAY " },
  { idBandeira: "028", descricao: "UPBRASIL " },
  { idBandeira: "165", descricao: "RAPPI " },
  { idBandeira: "177", descricao: "STIX SNC " },
  { idBandeira: "045", descricao: "INCOMM " },
];
