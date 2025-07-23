import { dados, IBandeira } from "@/types/Bandeira";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
import { message } from "antd";

export class CBandeira {
  public resumo: IBandeira[];
  public Bandeira: IBandeira[] = [];
  private nextId: number = 1;
  private nextKey: number = 1;

  constructor() {
    this.resumo = [...dados];
    this.Bandeira = [];
  }
  public addBandeira(rd: IBandeira): void {
    const exists = this.resumo.some((e) => e.idBandeira === rd.idBandeira);
    if (exists) {
      message.info("Bandeira ja cadastrada");
      return;
    }
    const newBandeira: IBandeira = {
      ...rd,
      date_create: dataHoraAtualFormato(),
      date_update: dataHoraAtualFormato(),
      user: "tc021864",
    };
    this.resumo = [...this.resumo, newBandeira];
    message.info("Bandeira salva nos dados locais. ");
    this.Bandeira = []
  }
  public deleteBandeira(idBandeira: string): void {
    this.resumo = this.resumo.filter((e) => e.idBandeira !== idBandeira); /// deletar
  }
  public statusBandeira(idBandeira: string, status: boolean): void {
    this.resumo = this.resumo.map((e) =>
      e.idBandeira === idBandeira
        ? {
            ...e,
            status: !status,
            date_update: dataHoraAtualFormato(),
            user: "tc021864",
          }
        : e
    );
  }
  public updateBandeira(rd: IBandeira): void {
    const newAttBandeira: IBandeira = {
      ...rd,
      date_update: dataHoraAtualFormato(),
      date_create: rd.date_create,
      user: "tc021864",
    };
    this.resumo = this.resumo.map((e) =>
      e.idBandeira === rd.idBandeira ? newAttBandeira : e
    );
  }
  public filterBandeira(values: IBandeira) {
    const { idBandeira, descricao } = values;

    if (!idBandeira && !descricao) {
      this.Bandeira = [];
      return;
    }
    // Busca principal
    this.Bandeira = this.resumo.filter((p) => {
      const matchId = idBandeira ? p?.idBandeira === idBandeira : true;
      const matchDescricao = descricao
        ? p?.descricao?.toLowerCase().includes(descricao.toLowerCase())
        : true;
      return matchId && matchDescricao;
    });

    // Se não encontrou nada
    if (this.Bandeira.length === 0) {
      this.Bandeira = this.resumo.filter((p) => {
        const matchId = idBandeira ? p?.idBandeira === idBandeira : false; // false para forçar filtrar só por descricao se idBandeira n foi informado
        const matchDescricao = descricao
          ? p?.descricao?.toLowerCase().includes(descricao.toLowerCase())
          : false;
        return matchId || matchDescricao;
      });
    }
  }
  public getById(idBandeira: string): IBandeira | undefined {
    return this.resumo.find((e) => e.idBandeira === idBandeira);
  }
  public getBandeiraFilter(): IBandeira[] {
    return [...this.Bandeira];
  }
  public getBandeira(): IBandeira[] {
    return [...this.resumo];
  }
  public getAllBandeira(ordernar: boolean = true): IBandeira[] {
    const lista = this.Bandeira.length > 0 ? this.Bandeira : this.resumo;
    return ordernar
      ? [...lista].sort((a, b) => a.descricao.localeCompare(b.descricao))
      : [...lista];
  }
}

export const cBandeira = new CBandeira();
