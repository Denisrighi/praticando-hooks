import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {
    const cep = evento.target.value;

    setEndereco({ cep });
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) =>
          setEndereco((enderecoAntigo) => {
            return {
              ...enderecoAntigo,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf,
            };
          })
        );
    }
  }

  const [racas, setRacas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/doguinhos")
      .then((resposta) => resposta.json())
      .then((dados) => setRacas(dados));
  }, []);

  useEffect(() => {
    if (busca && busca.length > 3) {
      fetch("http://localhost:8080/doguinhos?nome=" + busca)
        .then((resposta) => resposta.json())
        .then((dados) => setRacas(dados));
    }
  }, [busca]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem vindo aos doguinhos!</h1>
        <h4>Confira abaixo uma lista de raças dos doguinhos</h4>
        <input
          placeholder="Buscar por raça"
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <ul>
          <li>
            {racas.map((raca) => (
              <li key={raca.nome}>{raca.nome}</li>
            ))}
          </li>
        </ul>

        <h4>Confira abaixo o endereço de um CEP</h4>
        <input placeholder="Digite o cep" onChange={manipularEndereco} />
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
