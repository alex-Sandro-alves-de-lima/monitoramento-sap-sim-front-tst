import {
  dados,
  IMovimento,
  IMovimentoResumo,
  IRegistro,
} from "@/types/Movimento";
import { message } from "antd";
import dayjs, { Dayjs } from "dayjs";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Ativa os plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

enum StatusRegistroEnum {
  Sucesso = "1",
  Pendente = "2",
  Falha = "3",
}

export class CMovimento {
  public movimentos: IMovimento[];
  public resumo: IMovimentoResumo[];
  public resumoFiltro: IMovimentoResumo[];
  public registro: IRegistro[];

  constructor() {
    this.movimentos = [...dados];
    this.resumo = this.gerarResumo();
    this.resumoFiltro = [];
    this.registro = [];
  }
 getByLoja(values: { id_loja: string; dataMov?: [ Dayjs, Dayjs] }): IRegistro[] {
  const { id_loja, dataMov } = values;
    const start = dataMov?.[0];
    const end = dataMov?.[1];
  const movimentoCompleto = this.movimentos;
  const movimentoFiltrado = movimentoCompleto.filter((r) => {
    const data = dayjs(r.data_movimento, "DD/MM/YYYY");
    if (!data.isValid()) return false;
    return (
      data.isSameOrAfter(dayjs(start)) &&
      data.isSameOrBefore(dayjs(end))
    );
  });
  const registros = movimentoFiltrado
    .flatMap((mov) =>
      mov.registros
        .filter((r) => r.id_loja === id_loja)
        .map((r) => ({
          ...r,
          data_movimentacao: mov.data_movimento, 
        }))
    );

  return registros;
}

 
 getByData(dataMov?: {dataInicio: Dayjs, dataFim : Dayjs}) {
  const resumoCompleto = this.gerarResumo();
  const start = dataMov?.dataInicio;
  const end = dataMov?.dataFim;
  if (!dataMov && dataMov === undefined) {
    this.resumoFiltro = [];
    return;
  }
  const resumoFiltrado = resumoCompleto.filter((r) => {
    const data = dayjs(r.data_movimento, "DD/MM/YYYY");
    if (!data.isValid()) return false;
    return (
      data.isSameOrAfter(dayjs(start)) &&
      data.isSameOrBefore(dayjs(end))
    );
  });
 
  this.resumoFiltro = resumoFiltrado;
}

 gerarResumo(): IMovimentoResumo[] {
    return (this.resumo = this.movimentos.map((mov) => {
      const qtd_loja = mov.lojas.length;
      const qtd_registro = mov.status.length;

      const qtd_sucesso = mov.status.filter((s) => s.status_registro === StatusRegistroEnum.Sucesso
      ).length;
      const qtd_pendente = qtd_registro - qtd_sucesso;
      return {
        data_movimento: mov.data_movimento,
        qtd_loja,
        qtd_sucesso,
        qtd_pendente,
        qtd_registro,
      };
    }));
  }
  
 getAll(ordernar: boolean = true): IMovimentoResumo[] {
      const lista = this.resumoFiltro.length > 0 ? this.resumoFiltro : this.resumo;
      return ordernar
        ? [...lista].sort((a, b) => a.data_movimento.localeCompare(b.data_movimento))
        : [...lista];
    }
    get():IMovimentoResumo[] {
      return [...this.resumoFiltro]
    }
}

export const cMovimento = new CMovimento();
