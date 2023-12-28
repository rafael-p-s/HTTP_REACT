import "./App.css";

import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

// 1 - Resgatando dados
// URL base da API
const url = "http://localhost:3000/products";
// 1 - Resgatando dados

function App() {
  // 1 - Resgatando dados
  const [products, setProducts] = useState([]);

  // 2 - ADD PRODUTOS

  //**
  const [name, setName] = useState("");
  //**
  const [price, setPrice] = useState("");

  // 2 - ADD PRODUTOS
  // 4 - está sendo comentado para fazer utiliação de HOOKS
  // useEffect(() => {
  //   async function fetchData() {
  //     //fazendo requesição
  //     const res = await fetch(url);
  //     //Fazendo tratamento
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);

  // Agora com o HOOK a ideia é usar para alterar os dados com o HOOK criado

  //CUSTOM HOOK
  //data: items >> está renomeando para items
  const { data: items, httpConfig, loading, error } = useFetch(url);
  //CUSTOM HOOK

  // 4 - está sendo comentado para fazer utiliação de HOOKS

  // 1 - Resgatando dados

  // 2 - ADD PRODUTOS
  //isso é um objeto
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Vai mandar tudo para o back-end
    const product = {
      //no caso não é necessário colocar "name:name", pois eles estão tendo o mesmo nome dos objetos a cima**
      name,
      price,
    };
    // TODA ESSA PARTE ESTÁ DENTRO DE 1 HOOK
    // FAZER REQUESIÇÃO NO BACK-END:
    // const res = await fetch(url, {
    //   method: "POST",
    //   //cabeçalho da requesição, informando o tipo que está sendo mandado:
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   //DADO precisa ser informado como está sendo enviado.
    //   body: JSON.stringify(product),
    // });

    // // 3 - CARREGAMENTO DINÂMICO
    // //por ser uma variavel JSON, não é possível usar direto o "res", por isso transformar em outra variavel:
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // //Agora, ao enviar um novo produto, os inputs ficam limpos:
    // TODA ESSA PARTE ESTÁ DENTRO DE 1 HOOK

    // 5 - REFATORANDO POST
    httpConfig(product, "POST");

    setName("");
    setPrice("");

    // 3 - CARREGAMENTO DINÂMICO
  };
  //isso é um objeto
  // 2 - ADD PRODUTOS

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - LOADING */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name}--R$:{product.price}
              </li>
            ))}
        </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Valor:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - STATE DE LOADING NO POST */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar Produto" />}
        </form>
      </div>
    </div>
  );
}

export default App;
