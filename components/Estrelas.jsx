export default function Estrelas({ soma, num }) {
  const media = parseFloat(soma / num)

  const estrelas = []

  for (let i = 1; i <= parseInt(media); i++) {
    estrelas.push(
      <i className="bi bi-star-fill text-warning"></i>)
  }

  const decimos = media % 1
  if (decimos >= 0.25 && decimos <= 0.75) {
    estrelas.push(
      <i className="bi bi-star-half text-warning"></i>
    )
  } else if (decimos > 0.75) {
    estrelas.push(
      <i className="bi bi-star-fill text-warning"></i>)
  }

  return (
    <div className="float-start ms-2 fs-5">
      {estrelas}
    </div>
  )
}