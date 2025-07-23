import {
  dados,
  IFinalizadora,
  ITipoFinalizadoraFormValues,
} from "@/types/IFinalizadora";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
import { message } from "antd";

export const ETipoFinalizadoraMap: Record<string, string> = {
  "0": "Rede/Bandeira",
  "1": "Código finalizadora",
};

export class CFinalizadora {
  public resumo: IFinalizadora[];
  public finalizadora: IFinalizadora[] = [];
  public dadosMock: any[]=[];

  constructor() {
    this.resumo = [];
    this.finalizadora = [];
    this.handleMock();
  }
  public add(fnl: IFinalizadora): void {
    // const exists = this.resumo.some((e) => e.cod_int_sap_sim === fnl.cod_int_sap_sim);
    // if (exists) {
    //   message.info(`Código sim, ${fnl.cod_int_sap_sim} já cadastrado!`);
    //   return;
    // }

    const newFinalizadora: IFinalizadora = {
      ...fnl,
      data_ultima_modificacao: dataHoraAtualFormato(),
      data_cadastro: dataHoraAtualFormato(),
      user_id_mod: "tc021864",
      id: fnl.cod_int_sap_sim + fnl.cod_finalizadora + fnl.finalizadora?.id ,
      tipo_crtl: "",
      ind_status: false,
      desc_finalizadora: fnl.finalizadora?.descricao || "",
      descCod: fnl.finalizadora?.descCod || "",
    };
    const newFinaliz = fnl.combinacoes?.map((e) => ({
      ...fnl,
      id: fnl.cod_int_sap_sim + e.cod_bandeira +e.cod_rede,
      cod_bandeira: e.cod_bandeira,
      cod_rede: e.cod_rede,
      data_ultima_modificacao: dataHoraAtualFormato(),
      data_cadastro: dataHoraAtualFormato(),
      user_id_mod: "tc021864",
      desc_finalizadora: fnl.finalizadora?.descricao || "",
      tipo_crtl: "",
      ind_status: false,
      descCod: fnl.finalizadora?.descCod || "",
    })) || [newFinalizadora];
    //@ts-ignore
    this.resumo = [...this.resumo, ...newFinaliz];
        message.success("Dados salvos com sucesso!");
        this.finalizadora=[]
  }
  public delete(id: string): void {
    this.resumo = this.resumo.filter((e) => e.id !== id);
  }
  public status(id: string, status: boolean): void {
    this.resumo = this.resumo.map((e) =>
      e.id === id
        ? {
            ...e,
            ind_status: !status,
            data_ultima_modificacao: dataHoraAtualFormato(),
            user_id_mod: "tc021864",
          }
        : e
    );
  }
  public update(rd: IFinalizadora): void {
    const newAttFinalizadora: IFinalizadora = {
      ...rd,
      data_ultima_modificacao: dataHoraAtualFormato(),
      data_cadastro: rd.data_cadastro,
      user_id_mod: "tc021864",
    };
    this.resumo = this.resumo.map((e) =>
      e.id === rd.id ? newAttFinalizadora : e
    );
  }
  public filter(values: IFinalizadora) {
    const { cod_bandeira, cod_finalizadora, cod_int_sap_sim,cod_rede } = values;
    if (!cod_finalizadora && !cod_bandeira && !cod_int_sap_sim && !cod_rede ) {
      this.finalizadora = this.get();
      return;
    }
    // Busca principal
    this.finalizadora = this.resumo.filter((p) => {
      const matchCod_bandeira = cod_bandeira ? p?.cod_bandeira === cod_bandeira : true;
      const matchCod_int_sap_sim = cod_int_sap_sim ? p?.cod_int_sap_sim === cod_int_sap_sim : true;
      const matchCod_rede = cod_rede ? p?.cod_rede === cod_rede : true;
      const matchDescricao = cod_finalizadora ? p?.cod_finalizadora?.toLowerCase().includes(cod_finalizadora.toLowerCase()) : true;
      return matchCod_bandeira && matchDescricao && matchCod_int_sap_sim && matchCod_rede;
    });

    // Se não encontrou nada
    if (this.finalizadora.length === 0) {
      this.finalizadora = this.resumo.filter((p) => {
      const matchCod_bandeira = cod_bandeira ? p?.cod_bandeira === cod_bandeira : false;
      const matchCod_int_sap_sim = cod_int_sap_sim ? p?.cod_int_sap_sim === cod_int_sap_sim : false;
      const matchCod_rede = cod_rede ? p?.cod_rede === cod_rede : false;
      const matchDescricao = cod_finalizadora ? p?.cod_finalizadora?.toLowerCase().includes(cod_finalizadora.toLowerCase()) : false;
      return matchCod_bandeira || matchDescricao || matchCod_int_sap_sim || matchCod_rede;
    });
    }
  }
  private handleMock(): void {
    const cod_finalizadora = this.resumo?.filter((e) => e.cod_finalizadora !== undefined && e.cod_finalizadora !== null)
    .map((e) => ({
      cod_finalizadora: e.cod_finalizadora,
      value: e.cod_finalizadora,
    })).filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i) || [];

    const cod_int_sap_sim = this.resumo?.filter((e) => e.cod_int_sap_sim !== undefined && e.cod_int_sap_sim !== null)
    .map((e) => ({
      cod_int_sap_sim: e.cod_int_sap_sim,
      value: e.cod_int_sap_sim,
    })).filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i) || [];

  
    cod_finalizadora.forEach((e) => {
      const exists = this.dadosMock.some((a) => a.cod_finalizadora === e.cod_finalizadora);
      if (!exists) {
        this.dadosMock.push(e);
      }
    });

    cod_int_sap_sim.forEach((item) => {
      const exists = this.dadosMock.some((e) => e.cod_int_sap_sim === item.cod_int_sap_sim);
      if (!exists) {
        this.dadosMock.push(item);
      }
    });
  }
  public getById(id: string): IFinalizadora | undefined {
    return this.resumo.find((e) => e.id === id);
  }
  public getFilter(): IFinalizadora[] {
    return [...this.finalizadora];
  }
  public get(): IFinalizadora[] {
    return [...this.resumo];
  }
  public getAll(ordernar: boolean = true): IFinalizadora[] {
    this.handleMock();
    const lista =
      this.finalizadora.length > 0 ? this.finalizadora : this.resumo;
    return ordernar
      ? [...lista].sort((a, b) => a.id.localeCompare(b.id))
      : [...lista];
  }
}
export class CTipoFinalizadora {
  public resumo: ITipoFinalizadoraFormValues[];
  public tipofinalizadora: ITipoFinalizadoraFormValues[] = [];
  private nextId: number = 1;
  private nextKey: number = 1;

  constructor() {
    this.resumo = [...dados];
    this.tipofinalizadora = [];
  }
  private gerarId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  public add(fnl: ITipoFinalizadoraFormValues): void {
    const existsID = this.resumo.some((e) => e.id === fnl.id);
    const existsDesc = this.resumo.some((e) => e.descricao === fnl.descricao);
    if (existsID || existsDesc) {
      message.info("Registro ja cadastrado!");
      return;
    }

    const tipoDescricao =
      ETipoFinalizadoraMap[fnl.idTipo] || "Tipo desconhecido";
    const newTipo: ITipoFinalizadoraFormValues = {
      ...fnl,
      descCod: tipoDescricao,
    };
    console.log(newTipo);
    this.resumo = [...this.resumo, newTipo];
    message.success("Dados salvos com sucesso!");
  }
  public delete(id: string): void {
    this.resumo = this.resumo.filter((e) => e.id !== id);
  }
  public status(id: string, status: boolean): void {
    this.resumo = this.resumo.map((e) =>
      e.id === id
        ? {
            ...e,
            status: !status,
          }
        : e
    );
    message.info("Status modificado!");
  }
  public update(rd: ITipoFinalizadoraFormValues): void {
    const newAttTipo: ITipoFinalizadoraFormValues = {
      ...rd,
    };
    this.resumo = this.resumo.map((e) => (e.id === rd.id ? newAttTipo : e));
  }
  public filter(values: ITipoFinalizadoraFormValues) {
    const { id } = values;
    if (!id) {
      this.tipofinalizadora = [];
      return;
    }
    this.tipofinalizadora = this.resumo.filter((p) => p?.id === id);
  }
  public getById(id: string): ITipoFinalizadoraFormValues | undefined {
    return this.resumo.find((e) => e.id === id);
  }
  public getFilter(): ITipoFinalizadoraFormValues[] {
    return [...this.tipofinalizadora];
  }
  public get(): ITipoFinalizadoraFormValues[] {
    return [...this.resumo];
  }
  public getAll(ordernar: boolean = true): ITipoFinalizadoraFormValues[] {
    const lista =
      this.tipofinalizadora.length > 0 ? this.tipofinalizadora : this.resumo;
    return ordernar
      ? [...lista].sort((a, b) => a.id.localeCompare(b.id))
      : [...lista];
  }
}

export const cFinalizadora = new CFinalizadora();
export const cTipoFinalizadora = new CTipoFinalizadora();
