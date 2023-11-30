import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'

export default function ItemLista(props) {

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
        props.exclui(id)
        Swal.fire(
          'Excluído!',
          'Filme excluído com sucesso',
          'success'
        )
      }
    })
  }

  return (
    <tr>
      <td>
        <img src={props.filme.capa} alt={`Capa de ${props.filme.titulo}`} width={80} />        
      </td>
      <td className={props.filme.destaque ? "fw-bold" : ""}>{props.filme.titulo}</td>
      <td className={props.filme.destaque ? "fw-bold" : ""}>{props.filme.genero}</td>
      <td className={props.filme.destaque ? "fw-bold" : ""}>{props.filme.duracao}</td>
      <td className={props.filme.destaque ? "fw-bold" : ""}>{props.filme.classif}</td>
      <td>
        <i className="bi bi-x-circle text-danger" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={() => confirmaExclusao(props.filme.id, props.filme.titulo)}
           title="Excluir"
        ></i>
        <i className="bi bi-pencil-square text-warning ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.altera}
           title="Alterar"
        ></i>
        <i className="bi bi-search text-success ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.consulta}
           title="Consultar"
        ></i>
        <i className="bi bi-house-check text-primary ms-2" style={{fontSize: 24, cursor: 'pointer'}}
           onClick={props.destaca}
           title="Destacar"
        ></i>
      </td>
    </tr>    
  )
}