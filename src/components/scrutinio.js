import React, { Component } from 'react';
import { ProgressBar, Table, Card } from 'react-bootstrap';
import { UncontrolledCarousel, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from "reactstrap";

import logo from '../images/LOGOS-04.png';
import '../customerCss/scrutinio.css';
import { Candidatos } from '../utilities/pers.json';







class scrutinio extends Component {

    constructor(props) {
        {/* Este método es el primero que se ejecuta antes del render*/ }


        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super(props);


        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            candidatos: [],
            Candidatos,
            visible: false,
            visible1: false

        }
    }

    cargarCandidatos() {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }

        fetch("http://192.168.96.37:5000/consolidado", options)
            .then(response => response.json())
            .then((responseJson) => {

                this.setState({

                    candidatos: this.sortby(responseJson.candidatos, 'votos')

                })

                this.toggleAlert();

                console.log("este es response " + this.state.candidatos)


            }).catch(error => this.serverAlert())


    }



    serverAlert() {
        this.setState({
            visible1: !this.state.visible1
        }, () => {
            window.setTimeout(() => {
                this.setState({ visible1: !this.state.visible1 })
            }, 5000)
        });

        this.setState({
            modalIsopen: !this.state.modalIsopen,


        });

    }

    toggleAlert() {
        this.setState({
            visible: !this.state.visible
        }, () => {
            window.setTimeout(() => {
                this.setState({ visible: !this.state.visible })
            }, 5000)
        });

        this.setState({
            modalIsopen: !this.state.modalIsopen,


        });

    }

    sortby(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            console.log("x es  " + x)
            return parseInt(y) - parseInt(x)
        });
    }


    cnadidatos(indice) {

        return indice;

    }


    componentDidMount() {

        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }

        fetch("http://192.168.96.37:5000/consolidado", options)
            .then(response => response.json())
            .then((responseJson) => {

                /**  
                                responseJson.candidatos.sort(function (a, b) {
                                    parseInt(Object.values(a), 10)
                                    console.log("elemento es" + a)
                                    return parseInt(a.votos) > parseInt(b.votos);
                                })
                                responseJson.candidatos.sort()
                 */




                this.setState({

                    candidatos: this.sortby(responseJson.candidatos, 'votos')

                })

                console.log("este es response " + this.state.candidatos)


            }).catch(error => this.serverAlert())
    }


    render() {
        const now = 60;

        const candidatos = this.state.candidatos;

        const candidatos2 = this.state.Candidatos;


        const candidat = candidatos.map((cand, index) => {

            const indic = parseInt(cand.indice - 1);

            return (

                <ul className="list" key={index} >
                    <li className="lista">

                        <Card id="bod">
                            <Card.Body>
                                <div className="info-card">
                                    <div className="imageCan">

                                        <img src={candidatos2[indic].bg} className="card-img-scrum" alt="..."></img>
                                    </div>

                                    <div className="conten-cand">
                                        <h1 className="Nombre_candidat"> {cand.nombre} </h1>
                                        <ProgressBar now={cand.votos} label={`${now}%`} srOnly />
                                        <h4 className="votos">número de votos:{" " + cand.votos} </h4>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>

                    </li>
                </ul>
            )
        })



        return (



            <div>


                <Alert className="Alert_succes" color="success" isOpen={this.state.visible}>
                    Ha actualizado el sistema correctamente
                </Alert>

                <Alert className="Alert_danger" color="danger" isOpen={this.state.visible1}>
                    Ha ocurrido un error en el sistema verifique su conexión en la red
                </Alert>

                <img src={logo} className="home-logo_es" alt="Logo" />
                <h1 className="Title_scrun">  Escrutinio Definitivo EVA</h1>
                <br></br>
                <button type="button" id="actualizar" className="btn btn-primary" onClick={this.cargarCandidatos.bind(this)}>Actualizar</button>
                {candidat}
            </div>

        );
    }
}

export default scrutinio;