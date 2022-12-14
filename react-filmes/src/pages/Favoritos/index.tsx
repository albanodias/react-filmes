import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css'


function Favoritos() {
  const[filmes, setFilmes] = useState([]);

useEffect(() => {
  const minhaLista = localStorage.getItem("@primeflix");
  setFilmes(minhaLista !== null ? JSON.parse(minhaLista) : []);
}, [])

function excluirFilme(id: any) {
  let filtroFilmes = filmes.filter((item: any) => {
    return (item.id !== id)
  })

  setFilmes(filtroFilmes);
  localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  toast.success("Filme removido com sucesso!");
}

  return(
    <div className="meus-filmes">
      <h1>MeusFilmes</h1>

      {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo :( </span>}

        <ul>
          {filmes.map((item: any) => {
              return (
                <li key={item.id}>
                  <span>{item.title}</span>

                  <div>
                    <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                    <button onClick={() => excluirFilme(item.id)} >Excluir</button>
                  </div>
                </li>
              )
          })}
        </ul>      
    </div>
  )
}

export default Favoritos;