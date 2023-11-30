'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Home() {
  const [filmes, setFilmes] = useState([])
  const [geral, setGeral] = useState({})

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  useEffect( () => {
    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/avaliacoes/graph")
      const dados = await response.json()
      setFilmes(dados)
    }
    getDadosGrafico()

    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dados_gerais")
      const dados = await response.json()
      setGeral(dados)
    }
    getDadosGerais()
  }, [])

  const dados = [
    ["Estrelas", "Avaliação dos Clientes", "Meta do CineClube"],
    ["1", 0, 5],
    ["2", 0, 15],
    ["3", 0, 10],
    ["4", 0, 30],
    ["5", 0, 40],
  ];

  let somaAvaliacoes = 0
  filmes.forEach(filme => {
    somaAvaliacoes += filme.num
  })

  filmes.forEach(filme => {
    dados[filme.estrelas][1] = (filme.num / somaAvaliacoes) * 100
  })

  return (
    <div className="container">
      <h2 className="mt-3 mb-4">Visão Geral do Sistema</h2>

      <span className="btn btn-outline-primary btn-lg">
        <p className="badge bg-danger">{geral.clientes}</p>
        <p>Nº de Clientes Cadastrados</p>
      </span>
      <span className="btn btn-outline-primary btn-lg mx-2">
        <p className="badge bg-danger">{geral.filmes}</p>
        <p>Nº de Filmes Cadastrados</p>
      </span>
      <span className="btn btn-outline-primary btn-lg me-2">
        <p className="badge bg-danger">
          R$ {geral.media && Number(geral.media.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
        </p>
        <p>Preço Médio dos Filmes</p>
      </span>
      <span className="btn btn-outline-primary btn-lg">
        <p className="badge bg-danger">{geral.avaliacoes}</p>
        <p>Nº Total de Avaliações</p>
      </span>
      <span className="btn btn-outline-primary btn-lg">
        <p className="badge bg-danger">{geral.avaliacoes_dia}</p>
        <p>Nº de Avaliações do Dia</p>
      </span>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={dados}
        options={options}
      />

    </div>
  )
}
