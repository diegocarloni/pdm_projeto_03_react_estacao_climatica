import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class EstacaoClimatica extends Component {
    
    timer = null
    
    state = {
        data: null
    }

    componentDidMount() {
        console.log("EC: ComponentDidMount")
        this.timer = setInterval(()=> {
            this.setState({data: new Date().toLocaleTimeString()})
        }, 1000)
    }

    componentDidUpdate() {
        console.log("EC: ComponentDidUpdate")
    }

    componentWillUnmount() {
        console.log("EC: ComponentWillUnmount")
        clearInterval(this.timer)
    }

    render() {
        console.log("EC: render")
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-items-center border rounded mb-2" style={{height: '6rem'}}>
                    <i className={`fas fa-5x ${this.props.icone}`}></i>
                    <p className="w-75 ms-3 text-center fs-1">
                    {this.props.estacao}
                    </p>
                    </div>
                    <div>
                    <p className="text-center">
                        {
                            this.props.latitude ? 
                                `Coordenadas: ${this.props.latitude}, ${this.props.longitude}. Data: ${this.state.data}.`
                            :
                            `Clique no botão para saber a sua estação climática`
                        }
                    </p>
                    </div>
                    <button
                        onClick={this.props.obterLocalizacao} 
                        className="btn btn-outline-primary w-100 mt-2">
                        Qual a minha estação?
                    </button>
                    <buttun className="btn btn-outline-danger w-100 mt-2"
                        onClick={() => {
                        ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
                        }}>Perigo!!!
                    </buttun>
                </div>
            </div>
        )
    }
} 