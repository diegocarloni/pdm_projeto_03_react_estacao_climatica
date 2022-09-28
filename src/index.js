import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

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
        console.log('construtor')
        // this.state = {
        //    latitude: null,
        //    longitude: null,
        //    estacao: null, 
        //    data: null,
        //    icone: null, 
        //    mensagemDeErro: null
        // }
    }

    state = {
        latitude: null,
        longitude: null,
        estacao: null, 
        data: null,
        icone: null, 
        mensagemDeErro: null
    }

    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21)
        const d2 = new Date(ano, 8, 22)
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
            },
            (err) => {
                console.log(err)
                this.setState({mensagemDeErro: 'Tente novamente mais tarde'})
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
    componentDidMount(){
        this.obterLocalizacao()
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }

    render() {
        console.log("render")
        return (
        // responsividade, margem acima
            <div className="container mt-2">
        {/* uma linha, conteúdo centralizado, display é flex */}
                <div className="row justify-content-center">
        {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
                    <div className="col-md-8">
                        {
                        (!this.state.mensagemDeErro && !this.state.latitude)?
                            <Loading />
                            :
                            this.state.mensagemDeErro ?
                            <p className="border rounded p-2 fs-1">
                            É preciso dar permissão para acesso à localização.
                            </p>
                            : 
                            <EstacaoClimatica 
                                icone={this.state.icone}
                                estacao={this.state.estacao}
                                latitude={this.state.latitude}
                                longitude={this.state.longitude}
                                //data={this.state.data}
                                //mensagemDeErro={this.state.mensagemDeErro}
                                obterLocalizacao={this.obterLocalizacao}
                            />
                        }
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