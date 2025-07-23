import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useProductStore } from "@/store/useProductStore";

export function ProductPage() {
  const { list, create } = useProducts();
  const { selectedProduct, setSelectedProduct } = useProductStore();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);

  if (list.isLoading) return <p>Carregando...</p>;
  if (list.isError) return <p>Erro ao carregar</p>;

  const handleSubmit = () => {
    create.mutate({ nome, preco });
    setNome("");
    setPreco(0);
  };

  return (
    <div>
      <h1>Produtos</h1>

      <ul>
        {list.data?.map((produto: any) => (
          <li key={produto.id} onClick={() => setSelectedProduct(produto)}>
            {produto.nome} - R$ {produto.preco}
          </li>
        ))}
      </ul>

      <h2>Adicionar Produto</h2>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={preco} type="number" onChange={(e) => setPreco(+e.target.value)} placeholder="Preço" />
      <button onClick={handleSubmit}>Criar</button>

      {selectedProduct && (
        <p>
          Produto selecionado: {selectedProduct.nome} - R$ {selectedProduct.preco}
        </p>
      )}
    </div>
  );
}
