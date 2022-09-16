import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'

/*Função que define um componente react
export default function App (){


    //API de localização js. Localização do usuário
    //Para a exec não ficar parada/bloqueada aguardando a resp do usuário, colocamos a instrução abaixo.
    window.navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position)
        }    
    )*/

class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            latitude: null,
            langitude: null,
            estacao: null, 
            data: null,
            icone: null
        }
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 24)
        const d3 = new Date(ano, 11, 22)
        const d4 = new Date(ano, 3, 21)
        const sul = latitude < 0
        if (data >= d1 && data < d2){
            return sul ? 'Inverno' : 'Verão'
        }
        if (data >= d2 && data < d3){
            return sul ? 'Primavera' : 'Outono'
        }
        if (data >= d3 && data < d4){
            return sul ? 'Verão' : 'Inverno'
        }
        return sul ? 'Outono' : 'Primavera'
    }

    icones = {
        "Primavera" : "fa-seedling",
        "Verão" : "fa-umbrella-beach",
        "Outono" : "fa-tree",
        "Inverno" : "fa-snowman"
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (posicao) => {
                let data = new Date()
                let estacao = this.obterEstacao(data, posicao.coords.latitude);
                let icone = this.icones[estacao]
                console.log(icone)
                this.setState(
                    {
                        latitude: posicao.coords.latitude,
                        longitude: posicao.coords.longitude,
                        estacao: estacao,
                        data: data.toLocaleTimeString(),
                        icone: icone
                    }
                )
            }
        )
    }
       
/*    render(){
    return(
        <div>
            Meu App
        </div>
        )
    }
*/

    render() {
        return (
        // responsividade, margem acima
            <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
                <div className="row justify-content-center">
        {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
                 <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-items-center border rounded mb-2" style={{height: '6rem'}}>
                                <i className={`fas fa-5x ${this.state.icone}`}></i>
                                <p className="w-75 ms-3 text-center fs-1">
                                    {`${this.state.estacao}`}
                                </p>
                            </div>
                            <div>
                                <p className="tect-center">
                                    {
                                        this.state.latitude ? 
                                        `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}.`
                                        :
                                        `Clique no botão para saber a sua estação climática`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)