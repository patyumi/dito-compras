import { useState, useEffect, useReducer } from "react";
import api from "./services/api";

const Rest = () => {
  const [places, setPlaces] = useState({});
  const [products, setProducts] = useState([]);

  // Processa dados da API ao carregar a página
  useEffect(() => {
    processData();
  }, []);

  // Organiza objeto quando houver dados novos
  useEffect(() => {
    if (places.length > 0) {
      //console.log("Opa! Você tem compras. Deixa eu organizá-las para você!");
      mountObject(products, places);
    }
  }, [products, places]);

  const INITIAL__STATE = {
    loading: true,
    data: {}
  };

  // Dispara ações quando funções são concluídas
  const reduce = (state, action) => {
    if (action.type === "REQUEST") {
      //console.log("Processando dados ...");
      return {
        ...state,
        loading: true
      };
    }
    if (action.type === "MOUNTED") {
      //console.log("Montei um objeto novo com: ", action.data);
      return {
        ...state,
        loading: false,
        data: action.data
      };
    }
    return state;
  };

  const [data, dispatch] = useReducer(reduce, INITIAL__STATE);

  // FUNÇÕES

  //Recuperar dados da API
  const processData = async () => {
    dispatch({ type: "REQUEST" });
    const res = await api.get("/events.json");
    if (res.status === 200) {
      //console.log("Status = 200 >>", res.data.events);

      // Dados recuperados com sucesso
      setPlaces(filterType(res.data.events, "comprou"));
      setProducts(filterType(res.data.events, "comprou-produto"));
    } else {
      //console.log("Ocorreu um erro ao recuperar os dados das compras.");
    }
  };

  // Monta objeto com os dados organizados e filtrados
  const mountObject = (products, places) => {
    dispatch({ type: "REQUEST" });
    const place = places.map((item, index) => {
      //console.log("loja ", index, " - ", item);

      let id = find(item.custom_data, "key", "transaction_id").value;
      let timeStamp = Date.parse(item.timestamp);
      let loja = find(item.custom_data, "key", "store_name").value;
      let valorTotal = item.revenue;
      let compras = fetchProductId(products, id);

      return { id, timeStamp, loja, valorTotal, compras };
    });

    // Ordena as lojas por ordem decrescente
    const object = place.sort((a, b) => b.timeStamp - a.timeStamp);

    // Dispara ação na conclusão da função
    dispatch({ type: "MOUNTED", data: object });
    return data;
  };

  // Busca produtos pela transaction_id
  const fetchProductId = (products, id) => {
    const bag = products.map(prod => {
      const aux = prod.custom_data.filter(e => e.value === id);

      if (aux.length > 0) {
        return {
          timeStamp: Date.parse(prod.timestamp),
          precoUni: find(prod.custom_data, "key", "product_price").value,
          name: find(prod.custom_data, "key", "product_name").value
        };
      } else {
        return { name: "excedente" };
      }
    });

    // Remove arrays vazios
    const compraCerta = bag.filter(p => p.name !== "excedente");
    // Ordena as compras na ordem decrescente
    return compraCerta.sort((a, b) => b.timeStamp - a.timeStamp);
  };

  // Métodos

  // Filtra array por tipo (loja/compra)
  const filterType = (array, tipo) => {
    return array.filter(item => {
      return item.event === tipo;
    });
  };

  // Procura valor no array
  const find = (array, escopo, valorProcurado) => {
    // Array = array de busca / escopo = key do objeto que está buscando / valorProcurado = valor do objeto que deseja encontrar
    if (escopo === "key") {
      let match = array.find(b => {
        return b.key === valorProcurado;
      });
      return match;
    }

    if (escopo === "value") {
      let match = array.find(b => {
        return b.value === valorProcurado;
      });
      return match;
    }
  };

  return { ...data };
};

export default Rest;
