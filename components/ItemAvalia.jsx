import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'
import Estrelas from './Estrelas';

export default function ItemAvalia(props) {

  function confirmaExclusao(id) {
    Swal.fire({
      title: `Confirma Exclusão desta Avaliação?`,
      text: "Esta operação não poderá ser desfeita",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim. Excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclui(id)
        Swal.fire(
          'Excluído!',
          'Avaliação excluída com sucesso',
          'success'
        )
      }
    })
  }

  function AjustaData(data) {
    const anoMesDia = data.split("T")[0]
    const partes = anoMesDia.split("-")
    return partes[2] + "/" + partes[1] + "/" + partes[0]
  }

  return (
    <tr>
      <td>
        <img src={props.avalia.filme.capa} alt={`Capa de ${props.avalia.filme.titulo}`} width={60} />        
      </td>
      <td>{props.avalia.filme.titulo}</td>
      <td><Estrelas soma={props.avalia.filme.soma} num={props.avalia.filme.num} /></td>
      <td>{props.avalia.cliente.nome}</td>
      <td>{AjustaData(props.avalia.data)}</td>
      <td>{props.avalia.estrelas} estrelas</td>
      <td>{props.avalia.comentario}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={() => confirmaExclusao(props.avalia.id)}
           title="Excluir"
        ></i>
        <i className="bi bi-search text-success ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.consulta}
           title="Ver Detalhes"
        ></i>
      </td>
    </tr>    
  )
}