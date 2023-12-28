import { useState, useEffect } from "react";

//4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //5 - REFATORANDO O POST
  // \/ Irá configurar os POST, cabeçalhos
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  // callFetch será usado para mapear, onde caso ele tenha uma alteração, callFetch sera chamado para buscar os novos dados
  const [callFetch, setCallFetch] = useState(false);

  // 6 - LOADING
  const [loading, setLoading] = useState(false);

  // 8 - TRATANDO ERROS
  const [error, setError] = useState(null);

  // Para não ter que ficar fazendo várias alterações dentro do código, é possível fazer assim
  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  //Criar um request, que vai chamar a API
  useEffect(() => {
    // 6 - CRIANDO O LOADING
    setLoading(true);

    //requesição assincrona
    const fetchData = async () => {
      // 8 - TRATAMENTO DE ERRO
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados");
      }

      //depois de carregado, volta para false
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  // 5 - REFATORANDO POST
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        // irá servir para pegar dinamicamente uma url diferente, uma configuração diferente, para add coisas novas
        let fetchOptions = [url, config];
        // irá dar erro nos "await", pois precisa ser abraçado por uma função
        const res = await fetch(...fetchOptions);
        const json = await res.json();

        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config, method, url]);

  //Para ser usado o hook é necessário exportar ele e usar ao mesmo tempo
  return { data, httpConfig, loading,error };
};
