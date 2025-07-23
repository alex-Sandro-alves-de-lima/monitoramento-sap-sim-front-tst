
export interface Produto {
  id: string;           // Identificador único
  nome: string;         // Nome do produto
  descricao?: string;   // Descrição (opcional)
  preco: number;        // Preço do produto
  estoque: number;      // Quantidade em estoque
  categoria?: string;   // Categoria do produto (opcional)
  ativo: boolean;       // Produto ativo ou não
  criadoEm: string;     // Data de criação (ISO string)
  atualizadoEm?: string; // Data da última atualização (opcional)
}
