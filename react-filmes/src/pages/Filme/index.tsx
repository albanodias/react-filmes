import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import './style.css'


type filme = {
  id: string,
  title: string,
  overview: string,
  vote_average: string,
  backdrop_path: string,
}

function Filme(){
  const {id} = useParams();
 const navigate = useNavigate();

  const[loading, setLoading] = useState(true); 
  const[filme, setFilme] = useState<filme>({
      id:"",
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
          navigate("/", {replace: true});
          return;
        })
    }

    loadFilmes();

   return() =>{
    console.log("componente desmontados");
   }

  }, [navigate,id])


  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = minhaLista !== null ? JSON.parse(minhaLista) : [];

    const hasFilme = filmesSalvos.some((filmeSalvo: any) => filmeSalvo.id === filme.id)

    if(hasFilme){
      alert("Esse filme ja esta na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salco com sucesso");

  }



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
      <strong>Avaliação: {filme.vote_average} / 10 </strong>


      <div className="area-buttons">
      <button onClick={salvarFilme}>Salvar</button>
      <button>
        <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
          Trailer
        </a>
      </button>
      </div>
    </div>
  )
}

export default Filme;