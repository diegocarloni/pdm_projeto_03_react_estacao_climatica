import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'

class App extends React.Component{

/*Função que define um componente react
export default function App (){


    //API de localização js. Localização do usuário
    //Para a exec não ficar parada/bloqueada aguardando a resp do usuário, colocamos a instrução abaixo.
    window.navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position)
        }    
    )*/
        render(){
        return(
            <div>
                Meu App
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)