import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './style.css'

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "0d25ed6246b5a261bc1160d0ccc66700",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0,10));  
      setLoading(false);   
    }
    loadFilmes();

  }, []);

  if(loading) {
    return(
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )
  }


  return (
    <div className="cotainer">
      <div className="lista-filmes">
        {filmes.map((filme: any) => {
          return(
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img 
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}></img>
            <Link to={`/filme/${filme.id}`}>Acessar</Link>



              </article>
          )})}
      </div>     
    </div>
  );
}

export default Home;
