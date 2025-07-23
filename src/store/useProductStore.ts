
import { create } from "zustand";

type Product = {
  id: string;
  nome: string;
  preco: number;
};

type State = {
  selectedProduct: Product | null;
  setSelectedProduct: (produto: Product | null) => void;
};

export const useProductStore = create<State>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (produto) => set({ selectedProduct: produto }),
}));
