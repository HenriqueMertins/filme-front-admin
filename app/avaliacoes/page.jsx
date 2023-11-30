'use client'
import { useEffect, useState } from "react"
import ItemAvalia from "@/components/ItemAvalia"
import { useRouter } from "next/navigation"

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    async function getAvalia() {
      const response = await fetch("http://localhost:3004/avaliacoes")
      const dados = await response.json()
      setAvaliacoes(dados)
      setIsLoading(false)
    }
    getAvalia()
  }, [])

  async function excluiAvaliacao(id) {
    const response = await fetch("http://localhost:3004/avaliacoes/" + id, {
      method: "DELETE"
    })
    const novosDados = avaliacoes.filter(avalia => avalia.id != id)
    setAvaliacoes(novosDados)
  }

  const listaAvaliacoes = avaliacoes.map(avalia => (
    <ItemAvalia key={avalia.id}
      avalia={avalia}
      exclui={() => excluiAvaliacao(avalia.id)}
    />
  ))

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem de Avaliações</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="mt-2">Listagem de Avaliações</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título do Filme</th>
            <th>Média</th>
            <th>Nome do Cliente</th>
            <th>Data</th>
            <th>Avaliação</th>
            <th>Comentário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaAvaliacoes}
        </tbody>
      </table>
    </div>
  )
}