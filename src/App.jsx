import './App.css'
import { useState, useEffect } from 'react'


//adicionar os links do portfolio
//fazer deploy


function App() {
  const [apiUrlState, setApiUrlState] = useState("https://whispering-rahel-v-cordeiro-software-a872aefa.koyeb.app/")
  const [originalUrl, setOriginalUrl] = useState("");
  const [aviso, setAviso] = useState(true);
  const [listaUrls, setListaUrls] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [submitLog, setSubmitLog] = useState("");


  async function encurtarUrl(){ 
    if(originalUrl == ""){
      setSubmitLog("Campo Vazio!");

    } else {
    const apiUrl = "https://whispering-rahel-v-cordeiro-software-a872aefa.koyeb.app/url/"

    const postData = { url: originalUrl }

    setSubmitLog("Processando os dados...");

    try{
      const response = await fetch(apiUrl,  {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(postData)
      })
      if(!response.ok){
        const errorData = await response.json()
        setSubmitLog("Erro ao encurtar link");

        throw new Error(errorData.error || 'Network response was not ok');
      
      }

      setSubmitLog("Link Encurtado com Sucesso!");
      setOriginalUrl("");
      getUrls();
    } catch(error){
      setSubmitLog("Erro ao encurtar link");
      console.log(error);
    }
  }
  }
 
  async function getUrls(){
    setSubmitLog("");

    const apiUrl = "https://whispering-rahel-v-cordeiro-software-a872aefa.koyeb.app/"

    fetch(apiUrl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Network response was not ok ' + response.status)
      }

      setCarregando(false);
      return response.json();
    })
    .then(data=>{
      
      setListaUrls(data.urls.reverse())
    })
    .catch(error=>{
      console.error(error)
    })

    

  }

  useEffect(()=>{
    getUrls();

  }, [])

  return (
    <>

      {
        aviso &&        
      <header>  
        <div className='text'>
          <p>Veja meus outros projetos por aqui: <a target='_blank' href='https://victor-cordeiro-portfolio.vercel.app/'>meu portfólio</a></p>

        </div>
        <div className='close' onClick={()=>{setAviso(false)}}>
          <span>x</span>

        </div>
      </header>
      }


      <div className='section1'>
          <div className='titulo-div'>
            <h1>
              <span className='s-1'>ENCURTADOR</span> 
              <span className='s-2'>DE</span>  
              <span className='s-3'>URL</span>
            </h1>
          </div>
          <div className='subtitulo-div'>
            <p>Cria uma nova URL para redirecionar à original.</p>

          </div>
      </div>

      <main>

        <div className='input-div'>
          <input 
            name='url'
            value={originalUrl}
            onChange={e=>setOriginalUrl(e.target.value)}
            placeholder='URL para encurtar'
            type='url'
          />
        </div>

        <div className='button-div'>
          <button onClick={encurtarUrl}>Encurtar URL</button>
        </div>

        {
          submitLog&&
          <div>
            <p className='log'>{submitLog}</p>
          </div>
        }

        <div className='urls-box'>
        {
          carregando && 
          <div className='box-carregando'>
            <img width={100} height={100} src='https://media.tenor.com/XG8WXd4R7RYAAAAi/pato-caminando.gif'/>
            <p>Carregando...</p>
          </div>

        }
        
        {
          !carregando&&
          <h1 className='h1-links'>Todos os links encurtados: </h1>

        }
        {!carregando && 
        
        listaUrls.map((value, index)=>( 
          <div key={index} className='box'>
            <a target='_blank' href={apiUrlState+"url/" + value.hash}>Visitar com novo link</a>
            <p>Novo Link: {apiUrlState+"url/" + value.hash}</p>
            <p>Url Original: {value.url}</p>
            <p>Visitas: {value.visits}</p>
          </div>
        ))}
        </div>

        

      </main>
      
      {
        !carregando&&
        <footer>
          <a target="_blank" href='https://github.com/alphachief13/'>By: Victor Cordeiro</a>
        </footer>
      }


    </>
  )
}

export default App