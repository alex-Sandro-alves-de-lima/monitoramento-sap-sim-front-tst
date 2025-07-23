import { dados, IRede } from "@/types/Rede";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
import { message } from "antd";

export class CRede {
  public resumo: IRede[];
  public rede: IRede[] = [];
  private nextId: number = 1;
  private nextKey: number = 1;

  constructor() {
    this.resumo = [...dados];
    this.rede = [];
  }
  public addRede(rd: IRede): void {
    const exists = this.resumo.some((e) => e.idRede === rd.idRede);
    if (exists) {
      message.info("Rede ja cadastrada");
      return;
    }
    const newRede: IRede = {
      ...rd,
      date_create: dataHoraAtualFormato(),
      date_update: dataHoraAtualFormato(),
      user: "tc021864",
    };
    this.resumo = [...this.resumo, newRede];
    message.info("Rede salva nos dados locais. ");
    this.rede = []
  }

  public deleteRede(idRede: string): void {
    this.resumo = this.resumo.filter((e) => e.idRede !== idRede); /// deletar
  }

  public statusRede(idRede: string, status: boolean): void {
    this.resumo = this.resumo.map((e) =>
      e.idRede === idRede
        ? {
            ...e,
            status: !status,
            date_update: dataHoraAtualFormato(),
            user: "tc021864",
          }
        : e
    );
  }

  public updateRede(rd: IRede): void {
    const newAttRede: IRede = {
      ...rd,
      date_update: dataHoraAtualFormato(),
      date_create: rd.date_create,
      user: "tc021864",
    };
    this.resumo = this.resumo.map((e) =>
      e.idRede === rd.idRede ? newAttRede : e
    );
  }

  public filterRede(values: IRede) {
    const { idRede, descricao } = values;

    if (!idRede && !descricao) {
      this.rede = [];
      return;
    }

    // Busca principal
    this.rede = this.resumo.filter((p) => {
      const matchId = idRede ? p?.idRede === idRede : true;
      const matchDescricao = descricao
        ? p?.descricao?.toLowerCase().includes(descricao.toLowerCase())
        : true;
      return matchId && matchDescricao;
    });

    // Se não encontrou nada
    if (this.rede.length === 0) {
      this.rede = this.resumo.filter((p) => {
        const matchId = idRede ? p?.idRede === idRede : false; // false para forçar filtrar só por descricao se idRede n foi informado
        const matchDescricao = descricao
          ? p?.descricao?.toLowerCase().includes(descricao.toLowerCase())
          : false;
        return matchId || matchDescricao;
      });
    }
  }
  public getById(idRede: string): IRede | undefined {
    return this.resumo.find((e) => e.idRede === idRede);
  }
  public getRedeFilter(): IRede[] {
    return [...this.rede];
  }
  public getRede(): IRede[] {
    return [...this.resumo];
  }
  public getAllRede(ordernar: boolean = true): IRede[] {
    const lista = this.rede.length > 0 ? this.rede : this.resumo;
    return ordernar
      ? [...lista].sort((a, b) => a.descricao.localeCompare(b.descricao))
      : [...lista];
  }
}

export const cRede = new CRede();
