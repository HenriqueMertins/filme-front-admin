'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from 'sweetalert2'
import 'bootstrap-icons/font/bootstrap-icons.css';

function Avaliacoes() {
  const params = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3004/avaliacoes?filme_id=${params.id}`);
        const dados = await response.json();
        setAvaliacoes(dados);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  function AjustaData(data) {
    const anoMesDia = data.split("T")[0];
    const partes = anoMesDia.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  async function excluiFilme(id) {
    const response = await fetch("http://localhost:3004/avaliacoes/" + id, {
      method: "DELETE"
    })
    const novosDados = avaliacoes.filter(avaliacoes => avaliacoes.id != id)
    setAvaliacoes(novosDados)
  }

  function confirmaExclusao(id, titulo) {
    // if (confirm(`Confirma Exclusão do Filme "${titulo}"?`)) {
    //   props.exclui(id)
    // }
    Swal.fire({
      title: `Confirma Exclusão do Filme "${titulo}"?`,
      text: "Esta operação não poderá ser desfeita",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim. Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        excluiFilme(id)
        Swal.fire(
          'Excluído!',
          'Filme excluído com sucesso',
          'success'
        )
      }
    })
  }

  const listaAvaliacoes = avaliacoes.map(avalia => (
    <tr key={avalia.id}>
      <td>{avalia.cliente.nome}</td>
      <td>{AjustaData(avalia.data)}</td>
      <td>{avalia.estrelas} estrelas</td>
      <td>{avalia.comentario}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={() => confirmaExclusao(avalia.id, avalia.cliente.nome)}
          title="Excluir"
        ></i>
      </td>
    </tr>
  ));

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem das Avaliações do Filme</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-2">
        <span className="ms-3">Comentários sobre o filme: {avaliacoes[0]?.filme.titulo}</span>
      </h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Data</th>
            <th>Avaliação</th>
            <th>Comentário</th>
            <th>Ações</th>

          </tr>

        </thead>
        <tbody>{listaAvaliacoes}
        </tbody>
      </table>
    </div>
  );
}

// Marque o componente como um componente do lado do cliente
Avaliacoes.useClient = true;

export default Avaliacoes;
