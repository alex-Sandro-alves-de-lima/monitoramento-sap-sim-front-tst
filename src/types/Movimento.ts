export interface IRegistro {
  data_movimento?: string;
  id_loja: string;
  id_registro: string;
  status_registro: string;
}

interface StatusRegistro {
  id_registro: string;
  status_registro: string;
}

export interface IMovimento {
  data_movimento: string;
  lojas: string[];
  registros: IRegistro[];
  status: StatusRegistro[];
}

export const dados: IMovimento[] = [
  {
    data_movimento: "03/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00001", status_registro: "3" },
      { id_loja: "0001", id_registro: "00002", status_registro: "3" },
    ],
    status: [
      { id_registro: "00001", status_registro: "3" },
      { id_registro: "00002", status_registro: "3" },
    ],
  },
  {
    data_movimento: "04/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00003", status_registro: "1" },
      { id_loja: "0001", id_registro: "00004", status_registro: "3" },
      { id_loja: "0001", id_registro: "00005", status_registro: "3" },
    ],
    status: [
      { id_registro: "00003", status_registro: "1" },
      { id_registro: "00004", status_registro: "3" },
      { id_registro: "00005", status_registro: "3" },
    ],
  },
  {
    data_movimento: "05/06/2025 14:00",
    lojas: ["0001", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00006", status_registro: "1" },
      { id_loja: "1302", id_registro: "00007", status_registro: "3" },
      { id_loja: "0001", id_registro: "00008", status_registro: "3" },
      { id_loja: "1302", id_registro: "00009", status_registro: "3" },
    ],
    status: [
      { id_registro: "00006", status_registro: "1" },
      { id_registro: "00007", status_registro: "3" },
      { id_registro: "00008", status_registro: "3" },
      { id_registro: "00009", status_registro: "3" },
    ],
  },
  {
    data_movimento: "06/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00010", status_registro: "1" },
      { id_loja: "0001", id_registro: "00011", status_registro: "1" },
    ],
    status: [
      { id_registro: "00010", status_registro: "1" },
      { id_registro: "00011", status_registro: "1" },
    ],
  },
  {
    data_movimento: "07/06/2025 14:00",
    lojas: ["1200", "1302", "0001"],
    registros: [
      { id_loja: "1200", id_registro: "00012", status_registro: "3" },
      { id_loja: "1302", id_registro: "00013", status_registro: "2" },
    ],
    status: [
      { id_registro: "00012", status_registro: "3" },
      { id_registro: "00013", status_registro: "2" },
    ],
  },
  {
    data_movimento: "08/06/2025 14:00",
    lojas: ["0001", "1200", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00014", status_registro: "1" },
      { id_loja: "0001", id_registro: "00015", status_registro: "3" },
      { id_loja: "1302", id_registro: "00016", status_registro: "3" },
      { id_loja: "0001", id_registro: "00017", status_registro: "3" },
    ],
    status: [
      { id_registro: "00014", status_registro: "1" },
      { id_registro: "00015", status_registro: "3" },
      { id_registro: "00016", status_registro: "3" },
      { id_registro: "00017", status_registro: "3" },
    ],
  },
  {
    data_movimento: "09/06/2025 14:00",
    lojas: ["0001", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00018", status_registro: "1" },
      { id_loja: "0001", id_registro: "00019", status_registro: "1" },
      { id_loja: "0001", id_registro: "00020", status_registro: "3" },
    ],
    status: [
      { id_registro: "00018", status_registro: "1" },
      { id_registro: "00019", status_registro: "1" },
      { id_registro: "00020", status_registro: "3" },
    ],
  },
  {
    data_movimento: "10/06/2025 14:00",
    lojas: ["1200", "0001"],
    registros: [
      { id_loja: "1200", id_registro: "00021", status_registro: "3" },
      { id_loja: "0001", id_registro: "00022", status_registro: "3" },
    ],
    status: [
      { id_registro: "00021", status_registro: "3" },
      { id_registro: "00022", status_registro: "3" },
    ],
  },
  {
    data_movimento: "11/06/2025 14:00",
    lojas: ["1200", "0001", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00023", status_registro: "3" },
      { id_loja: "0001", id_registro: "00024", status_registro: "1" },
      { id_loja: "1302", id_registro: "00025", status_registro: "3" },
    ],
    status: [
      { id_registro: "00023", status_registro: "3" },
      { id_registro: "00024", status_registro: "1" },
      { id_registro: "00025", status_registro: "3" },
    ],
  },
  {
    data_movimento: "12/06/2025 14:00",
    lojas: ["0001", "1200"],
    registros: [
      { id_loja: "1200", id_registro: "00026", status_registro: "3" },
      { id_loja: "1200", id_registro: "00027", status_registro: "2" },
      { id_loja: "1200", id_registro: "00028", status_registro: "2" },
    ],
    status: [
      { id_registro: "00026", status_registro: "3" },
      { id_registro: "00027", status_registro: "2" },
      { id_registro: "00028", status_registro: "2" },
    ],
  },
  {
    data_movimento: "13/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00029", status_registro: "3" },
      { id_loja: "0001", id_registro: "00030", status_registro: "2" },
      { id_loja: "0001", id_registro: "00031", status_registro: "1" },
    ],
    status: [
      { id_registro: "00029", status_registro: "3" },
      { id_registro: "00030", status_registro: "2" },
      { id_registro: "00031", status_registro: "1" },
    ],
  },
  {
    data_movimento: "14/06/2025 14:00",
    lojas: ["0001", "1200", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00032", status_registro: "1" },
      { id_loja: "0001", id_registro: "00033", status_registro: "2" },
      { id_loja: "0001", id_registro: "00034", status_registro: "2" },
    ],
    status: [
      { id_registro: "00032", status_registro: "1" },
      { id_registro: "00033", status_registro: "2" },
      { id_registro: "00034", status_registro: "2" },
    ],
  },
  {
    data_movimento: "15/06/2025 14:00",
    lojas: ["0001", "1200", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00035", status_registro: "2" },
      { id_loja: "1302", id_registro: "00036", status_registro: "2" },
    ],
    status: [
      { id_registro: "00035", status_registro: "2" },
      { id_registro: "00036", status_registro: "2" },
    ],
  },
  {
    data_movimento: "16/06/2025 14:00",
    lojas: ["1302", "0001"],
    registros: [
      { id_loja: "1302", id_registro: "00037", status_registro: "2" },
      { id_loja: "0001", id_registro: "00038", status_registro: "3" },
      { id_loja: "1302", id_registro: "00039", status_registro: "3" },
      { id_loja: "0001", id_registro: "00040", status_registro: "3" },
    ],
    status: [
      { id_registro: "00037", status_registro: "2" },
      { id_registro: "00038", status_registro: "3" },
      { id_registro: "00039", status_registro: "3" },
      { id_registro: "00040", status_registro: "3" },
    ],
  },
  {
    data_movimento: "17/06/2025 14:00",
    lojas: ["1302"],
    registros: [
      { id_loja: "1302", id_registro: "00041", status_registro: "1" },
      { id_loja: "1302", id_registro: "00042", status_registro: "3" },
    ],
    status: [
      { id_registro: "00041", status_registro: "1" },
      { id_registro: "00042", status_registro: "3" },
    ],
  },
  {
    data_movimento: "18/06/2025 14:00",
    lojas: ["1302", "0001"],
    registros: [
      { id_loja: "0001", id_registro: "00043", status_registro: "3" },
      { id_loja: "0001", id_registro: "00044", status_registro: "2" },
    ],
    status: [
      { id_registro: "00043", status_registro: "3" },
      { id_registro: "00044", status_registro: "2" },
    ],
  },
  {
    data_movimento: "19/06/2025 14:00",
    lojas: ["1200"],
    registros: [
      { id_loja: "1200", id_registro: "00045", status_registro: "2" },
      { id_loja: "1200", id_registro: "00046", status_registro: "2" },
      { id_loja: "1200", id_registro: "00047", status_registro: "1" },
    ],
    status: [
      { id_registro: "00045", status_registro: "2" },
      { id_registro: "00046", status_registro: "2" },
      { id_registro: "00047", status_registro: "1" },
    ],
  },
  {
    data_movimento: "20/06/2025 14:00",
    lojas: ["0001", "1200"],
    registros: [
      { id_loja: "1200", id_registro: "00048", status_registro: "2" },
      { id_loja: "1200", id_registro: "00049", status_registro: "2" },
    ],
    status: [
      { id_registro: "00048", status_registro: "2" },
      { id_registro: "00049", status_registro: "2" },
    ],
  },
  {
    data_movimento: "21/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00050", status_registro: "2" },
      { id_loja: "0001", id_registro: "00051", status_registro: "3" },
      { id_loja: "0001", id_registro: "00052", status_registro: "3" },
      { id_loja: "0001", id_registro: "00053", status_registro: "1" },
    ],
    status: [
      { id_registro: "00050", status_registro: "2" },
      { id_registro: "00051", status_registro: "3" },
      { id_registro: "00052", status_registro: "3" },
      { id_registro: "00053", status_registro: "1" },
    ],
  },
  {
    data_movimento: "22/06/2025 14:00",
    lojas: ["1302"],
    registros: [
      { id_loja: "1302", id_registro: "00054", status_registro: "2" },
      { id_loja: "1302", id_registro: "00055", status_registro: "2" },
      { id_loja: "1302", id_registro: "00056", status_registro: "2" },
      { id_loja: "1302", id_registro: "00057", status_registro: "2" },
    ],
    status: [
      { id_registro: "00054", status_registro: "2" },
      { id_registro: "00055", status_registro: "2" },
      { id_registro: "00056", status_registro: "2" },
      { id_registro: "00057", status_registro: "2" },
    ],
  },
  {
    data_movimento: "23/06/2025 14:00",
    lojas: ["1302", "1200"],
    registros: [
      { id_loja: "1200", id_registro: "00058", status_registro: "1" },
      { id_loja: "1302", id_registro: "00059", status_registro: "1" },
    ],
    status: [
      { id_registro: "00058", status_registro: "1" },
      { id_registro: "00059", status_registro: "1" },
    ],
  },
  {
    data_movimento: "24/06/2025 14:00",
    lojas: ["1200"],
    registros: [
      { id_loja: "1200", id_registro: "00060", status_registro: "3" },
      { id_loja: "1200", id_registro: "00061", status_registro: "2" },
      { id_loja: "1200", id_registro: "00062", status_registro: "2" },
      { id_loja: "1200", id_registro: "00063", status_registro: "2" },
    ],
    status: [
      { id_registro: "00060", status_registro: "3" },
      { id_registro: "00061", status_registro: "2" },
      { id_registro: "00062", status_registro: "2" },
      { id_registro: "00063", status_registro: "2" },
    ],
  },
  {
    data_movimento: "25/06/2025 14:00",
    lojas: ["0001", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00064", status_registro: "1" },
      { id_loja: "1302", id_registro: "00065", status_registro: "2" },
    ],
    status: [
      { id_registro: "00064", status_registro: "1" },
      { id_registro: "00065", status_registro: "2" },
    ],
  },
  {
    data_movimento: "26/06/2025 14:00",
    lojas: ["0001", "1302", "1200"],
    registros: [
      { id_loja: "1302", id_registro: "00066", status_registro: "1" },
      { id_loja: "0001", id_registro: "00067", status_registro: "2" },
    ],
    status: [
      { id_registro: "00066", status_registro: "1" },
      { id_registro: "00067", status_registro: "2" },
    ],
  },
  {
    data_movimento: "27/06/2025 14:00",
    lojas: ["0001", "1200"],
    registros: [
      { id_loja: "0001", id_registro: "00068", status_registro: "3" },
      { id_loja: "0001", id_registro: "00069", status_registro: "3" },
      { id_loja: "0001", id_registro: "00070", status_registro: "3" },
      { id_loja: "1200", id_registro: "00071", status_registro: "1" },
    ],
    status: [
      { id_registro: "00068", status_registro: "3" },
      { id_registro: "00069", status_registro: "3" },
      { id_registro: "00070", status_registro: "3" },
      { id_registro: "00071", status_registro: "1" },
    ],
  },
  {
    data_movimento: "28/06/2025 14:00",
    lojas: ["1200"],
    registros: [
      { id_loja: "1200", id_registro: "00072", status_registro: "2" },
      { id_loja: "1200", id_registro: "00073", status_registro: "1" },
      { id_loja: "1200", id_registro: "00074", status_registro: "1" },
      { id_loja: "1200", id_registro: "00075", status_registro: "3" },
    ],
    status: [
      { id_registro: "00072", status_registro: "2" },
      { id_registro: "00073", status_registro: "1" },
      { id_registro: "00074", status_registro: "1" },
      { id_registro: "00075", status_registro: "3" },
    ],
  },
  {
    data_movimento: "29/06/2025 14:00",
    lojas: ["0001"],
    registros: [
      { id_loja: "0001", id_registro: "00076", status_registro: "1" },
      { id_loja: "0001", id_registro: "00077", status_registro: "1" },
      { id_loja: "0001", id_registro: "00078", status_registro: "2" },
    ],
    status: [
      { id_registro: "00076", status_registro: "1" },
      { id_registro: "00077", status_registro: "1" },
      { id_registro: "00078", status_registro: "2" },
    ],
  },
  {
    data_movimento: "30/06/2025 14:00",
    lojas: ["0001", "1200"],
    registros: [
      { id_loja: "0001", id_registro: "00079", status_registro: "2" },
      { id_loja: "1200", id_registro: "00080", status_registro: "3" },
    ],
    status: [
      { id_registro: "00079", status_registro: "2" },
      { id_registro: "00080", status_registro: "3" },
    ],
  },
  {
    data_movimento: "01/07/2025 14:00",
    lojas: ["1200", "0001"],
    registros: [
      { id_loja: "1200", id_registro: "00081", status_registro: "1" },
      { id_loja: "0001", id_registro: "00082", status_registro: "2" },
      { id_loja: "1200", id_registro: "00083", status_registro: "3" },
    ],
    status: [
      { id_registro: "00081", status_registro: "1" },
      { id_registro: "00082", status_registro: "2" },
      { id_registro: "00083", status_registro: "3" },
    ],
  },
  {
    data_movimento: "02/07/2025 14:00",
    lojas: ["0001", "1302"],
    registros: [
      { id_loja: "0001", id_registro: "00084", status_registro: "3" },
      { id_loja: "1302", id_registro: "00085", status_registro: "3" },
    ],
    status: [
      { id_registro: "00084", status_registro: "3" },
      { id_registro: "00085", status_registro: "3" },
    ],
  },
  {
    data_movimento: "03/07/2025 14:00",
    lojas: ["0001", "1200"],
    registros: [
      { id_loja: "1200", id_registro: "00086", status_registro: "3" },
      { id_loja: "0001", id_registro: "00087", status_registro: "1" },
      { id_loja: "1200", id_registro: "00088", status_registro: "1" },
      { id_loja: "1200", id_registro: "00089", status_registro: "1" },
    ],
    status: [
      { id_registro: "00086", status_registro: "3" },
      { id_registro: "00087", status_registro: "1" },
      { id_registro: "00088", status_registro: "1" },
      { id_registro: "00089", status_registro: "1" },
    ],
  },
];

export interface IMovimentoResumo {
  data_movimento: string;
  qtd_loja: number;
  qtd_sucesso: number;
  qtd_pendente: number;
  qtd_registro: number;
}
