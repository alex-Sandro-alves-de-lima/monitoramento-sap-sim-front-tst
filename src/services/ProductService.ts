
import api from "@/api/axiosInstance";

export class ProductService {
  async getAll() {
    const response = await api.get("/produtos");
    return response.data;
  }

  async create(data: { nome: string; preco: number }) {
    const response = await api.post("/produtos", data);
    return response.data;
  }
}
