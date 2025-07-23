import { create } from "zustand";
import { IRede } from "@/types/Rede";
import { CRede } from "@/module/rede.entity";
import { CFinalizadora, CTipoFinalizadora } from "@/module/finalizadora.entity";
import {
  IFinalizadora,
  ITipoFinalizadoraFormValues,
} from "@/types/IFinalizadora";
import { CBandeira } from "@/module/bandeira.entity";
import { IBandeira } from "@/types/Bandeira";
import { CMovimento } from "@/module/movimento.entity";
import { IMovimento, IMovimentoResumo, IRegistro } from "@/types/Movimento";
import { Dayjs } from "dayjs";
import { Grupo, gruposMock } from "@/types/Analise";

const cBandeira = new CBandeira();
const cRede = new CRede();
const cTipoFinalizadora = new CTipoFinalizadora();
const cFinalizadora = new CFinalizadora();
const cMovimento = new CMovimento();

interface CMovimentoState {
  movimento: IMovimento[];
  resumo: IMovimentoResumo[] | undefined;
  registro: IRegistro[];
  fetchResumo: () => Promise<void>;
  fetchLoja: (values:{id_loja: string, dataMov?: [ Dayjs, Dayjs]}) => Promise<void>;
  fetchData: (dataMov?: {dataInicio: Dayjs, dataFim : Dayjs}) => Promise<void>;
}

export const movimentoStore = create<CMovimentoState>((set) => ({
  movimento: [],
  resumo: [],
  registro:[],
  fetchResumo: async () => {
    set({ resumo: cMovimento.getAll() });
  },
  fetchData: async (data) => {
    cMovimento.getByData(data)
    set({ resumo: cMovimento.getAll()});
  },
  fetchLoja: async (values) => {
    set({ registro: cMovimento.getByLoja(values) });
  },
   
}));

interface CRedeState {
  redes: IRede[];
  fetchRede: () => Promise<void>;
  addRedes: (rede: IRede) => Promise<void>;
  deleteRede: (idRede: string) => Promise<void>;
  statusRede: (idRede: string, status: boolean) => Promise<void>;
  editeRede: (newRede: IRede) => Promise<void>;
  filterRede: (values: IRede) => Promise<void>;
}

export const redeStore = create<CRedeState>((set) => ({
  redes: [],
  fetchRede: async () => {
    await cRede.getAllRede();
    set({ redes: cRede.getAllRede() });
  },
  addRedes: async (rede) => {
    await cRede.addRede(rede);
    await cRede.getAllRede();
    set({ redes: cRede.getAllRede() });
  },
  deleteRede: async (id) => {
    await cRede.deleteRede(id);
    set({ redes: cRede.getAllRede() });
  },
  statusRede: async (id, st) => {
    await cRede.statusRede(id, st);
    set({ redes: cRede.getAllRede() });
  },
  editeRede: async (newRede) => {
    await cRede.updateRede(newRede);
    set({ redes: cRede.getAllRede() });
  },
  filterRede: async (values) => {
    await cRede.filterRede(values);
    cRede.getRedeFilter();
    set({ redes: cRede.rede });
  },
}));

interface CBandeiraState {
  Bandeiras: IBandeira[];
  fetchBandeira: () => Promise<void>;
  addBandeiras: (Bandeira: IBandeira) => Promise<void>;
  deleteBandeira: (idBandeira: string) => Promise<void>;
  statusBandeira: (idBandeira: string, status: boolean) => Promise<void>;
  editeBandeira: (newBandeira: IBandeira) => Promise<void>;
  filterBandeira: (values: IBandeira) => Promise<void>;
}

export const BandeiraStore = create<CBandeiraState>((set) => ({
  Bandeiras: [],
  fetchBandeira: async () => {
    await cBandeira.getAllBandeira();
    set({ Bandeiras: cBandeira.getAllBandeira() });
  },
  addBandeiras: async (Bandeira) => {
    await cBandeira.addBandeira(Bandeira);
    await cBandeira.getAllBandeira();
    set({ Bandeiras: cBandeira.getAllBandeira() });
  },
  deleteBandeira: async (id) => {
    await cBandeira.deleteBandeira(id);
    set({ Bandeiras: cBandeira.getAllBandeira() });
  },
  statusBandeira: async (id, st) => {
    await cBandeira.statusBandeira(id, st);
    set({ Bandeiras: cBandeira.getAllBandeira() });
  },
  editeBandeira: async (newBandeira) => {
    await cBandeira.updateBandeira(newBandeira);
    set({ Bandeiras: cBandeira.getAllBandeira() });
  },
  filterBandeira: async (values) => {
    await cBandeira.filterBandeira(values);
    cBandeira.getBandeiraFilter();
    set({ Bandeiras: cBandeira.Bandeira });
  },
}));

interface ICFinalizadora {
  finalizadora: IFinalizadora[];
  dadosMock: any[];
  fetch: () => Promise<void>;
  add: (finalizadora: IFinalizadora) => Promise<void>;
  deleteF: (id: string) => Promise<void>;
  status: (id: string, status: boolean) => Promise<void>;
  edite: (newT: IFinalizadora) => Promise<void>;
  filter: (values: IFinalizadora) => Promise<void>;
}

export const finalizadoraStore = create<ICFinalizadora>((set) => ({
  dadosMock: [],
  finalizadora: [],
  fetch: async () => {
    cFinalizadora.getAll();
    set({
      finalizadora: cFinalizadora.getAll(),
      dadosMock: cFinalizadora.dadosMock,
    });
  },
  add: async (obj) => {
    await cFinalizadora.add(obj);
    await cFinalizadora.getAll();
    set({
      finalizadora: cFinalizadora.getAll(),
      dadosMock: cFinalizadora.dadosMock,
    });
  },
  deleteF: async (id) => {
    await cFinalizadora.delete(id);
    set({
      finalizadora: cFinalizadora.get(),
      dadosMock: cFinalizadora.dadosMock,
    });
  },
  status: async (id, st) => {
    await cFinalizadora.status(id, st);
    set({
      finalizadora: cFinalizadora.getAll(),
      dadosMock: cFinalizadora.dadosMock,
    });
  },
  edite: async (newT) => {
    await cFinalizadora.update(newT);
    set({
      finalizadora: cFinalizadora.getAll(),
      dadosMock: cFinalizadora.dadosMock,
    });
  },
  filter: async (values) => {
    await cFinalizadora.filter(values);
    cFinalizadora.getFilter();
    set({
      finalizadora: cFinalizadora.finalizadora,
      dadosMock: cFinalizadora.dadosMock,
    });
  },
}));

interface ICTipoFinalizadora {
  tipoFinalizadora: ITipoFinalizadoraFormValues[];
  fetch: () => Promise<void>;
  add: (tipoFinalizadora: ITipoFinalizadoraFormValues) => Promise<void>;
  deleteTp: (id: string) => Promise<void>;
  status: (id: string, status: boolean) => Promise<void>;
  edite: (newT: ITipoFinalizadoraFormValues) => Promise<void>;
  filter: (values: ITipoFinalizadoraFormValues) => Promise<void>;
}

export const tipofinalizadoraStore = create<ICTipoFinalizadora>((set) => ({
  tipoFinalizadora: [],
  fetch: async () => {
    await cTipoFinalizadora.getAll();
    set({ tipoFinalizadora: cTipoFinalizadora.getAll() });
  },
  add: async (obj) => {
    await cTipoFinalizadora.add(obj);
    await cTipoFinalizadora.getAll();
    set({ tipoFinalizadora: cTipoFinalizadora.getAll() });
  },
  deleteTp: async (id) => {
    await cTipoFinalizadora.delete(id);
    set({ tipoFinalizadora: cTipoFinalizadora.getAll() });
  },
  status: async (id, st) => {
    await cTipoFinalizadora.status(id, st);
    set({ tipoFinalizadora: cTipoFinalizadora.getAll() });
  },
  edite: async (newT) => {
    await cTipoFinalizadora.update(newT);
    set({ tipoFinalizadora: cTipoFinalizadora.getAll() });
  },
  filter: async (values) => {
    await cTipoFinalizadora.filter(values);
    cTipoFinalizadora.getFilter();
    set({ tipoFinalizadora: cTipoFinalizadora.tipofinalizadora });
  },
}));


interface IGrupo {
  mockGrupo: Grupo[];
  fetchMockGrupo: () => Promise<void>;
  addMockGrupo: (mockGrupo : Grupo[]) => Promise<void>;
}

export const mockGrupoStore = create<IGrupo>((set) => ({
  mockGrupo: [],
  fetchMockGrupo: async () => {
    set({ mockGrupo: [...gruposMock] });
  },
  addMockGrupo: async (data) => {
    set({ mockGrupo: data});
  }
   
}));
