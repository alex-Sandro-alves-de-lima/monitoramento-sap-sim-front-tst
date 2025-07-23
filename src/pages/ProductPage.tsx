import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product";
import { Card, Image } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
        {list.data?.map((produto: Product) => (
          <li key={produto.id} onClick={() => setSelectedProduct(produto)}>
            {produto.description} - R$ {produto.price}
          </li>
        ))}
      </ul>

      <h2>Adicionar Produto</h2>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input value={preco} type="number" onChange={(e) => setPreco(+e.target.value)} placeholder="Preço" />
      <button onClick={handleSubmit}>Criar</button>

      {selectedProduct && (
        <>
        <p>
          Produto selecionado: {selectedProduct.description} - R$ {selectedProduct.description}
        </p>
          <Card 
           title={selectedProduct.description}
           extra= {<DownOutlined/>}
           style={{width: 300}}>
            <Image
            width={150}
            src={selectedProduct.thumbnail}
            />

        </Card>
      </>
      )}
    </div>
  );
}
