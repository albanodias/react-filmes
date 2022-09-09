import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'


function Favoritos() {
  const[filmes, setFilmes] = useState([]);

useEffect(() => {
  const minhaLista = localStorage.getItem("@primeflix");
  setFilmes(minhaLista !== null ? JSON.parse(minhaLista) : []);
}, [])

  return(
    <div className="meus-filmes">
      <h1>MeusFilmes</h1>
        <ul>
          {filmes.map((item: any) => {
              return (
                <li key={item.id}>
                  <span>{item.title}</span>

                  <div>
                    <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                    <button>Excluir</button>
                  </div>
                </li>
              )
          })}
        </ul>      
    </div>
  )
}

export default Favoritos;