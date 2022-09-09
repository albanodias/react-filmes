import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import './style.css'


type filme = {
  title: string,
  overview: string,
  vote_average: string,
  backdrop_path: string,
}

function Filme(){

  const {id} = useParams();
  const[loading, setLoading] = useState(true); 

  const[filme, setFilme] = useState<filme>({
     title: "",
      overview: "",
      vote_average: "",
      backdrop_path: "",
    }
  );



  useEffect(() => {
    async function loadFilmes(){
        await api.get(`movie/${id}`, {
          params: {
            api_key: "0d25ed6246b5a261bc1160d0ccc66700",
            language: "pt-BR",
          }
        })
        .then((response: any) =>{
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme n encontrado")
        })
    }

    loadFilmes();

   return() =>{
    console.log("componente desmontados");
   }

  }, [])

  if(loading){
    return(
      <div className="filme-info">
        <h1>loading...</h1>
      </div>
    )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img 
              src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
              alt={filme.title}></img>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliacao: {filme.vote_average} / 10 </strong>


      <div className="area-buttons">
      <button>Salvar</button>
      <button>
        <a href="#">
          Trailer
        </a>
      </button>
      </div>
    </div>
  )
}

export default Filme;