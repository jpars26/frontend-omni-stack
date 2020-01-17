import React, { useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Saidebar.css';
import './main.css'
import DevItem from './components/DevItem'
import DevFrom from './components/DevFrom';

//Tudo no react é baseado nesses 3 conceitos:
//Componente (É uma função que retorna algum conteudo html, css e javascript. Bloco isolado de Html, css e javascript, o qual nao interfere no restante da aplicação)
//Propriedade (Informações que um componente PAI passa para o FILHO )
//Estado : Informações mantidas pelo componente (Lembrar: Imutabilidade)




function App() {
  const [devs, setDevs] = useState([]);
   
  useEffect(() =>{
    async function loadDevs(){
    const response  = await api.get('./devs')

    setDevs(response.data);
    }

    loadDevs()
  }, []);
 
  async function handleAddDev(data) {

    const response = await api.post('./devs',data)
  
    setDevs([...devs, response.data]);
  }

  return(

    <div id='app'>
        <aside>
          <strong>Cadastrar</strong>
          <DevFrom onSubmit = {handleAddDev} />
    
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev}/>
             
            ))}
           

            
          </ul>
        </main>
    </div>
  )

}

export default App;
