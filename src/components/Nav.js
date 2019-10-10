import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Candidatos } from '../utilities/pers.json';
import '../customerCss/customer.css';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { UncontrolledCarousel, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from "reactstrap";
import logo from '../images/LOGOS-04.png'
import { Button } from 'react-bootstrap';
import ScanQRS from './ScanQR'

import ScanQR from './ScanQR'


import Home from './Home';
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';




class nav extends Component {

    constructor(props) {
        {/* Este método es el primero que se ejecuta antes del render*/ }

        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super(props);

        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            Candidatos,
            modalIsopen: false,
            element: "",
            visible: false,
            visible1: false,



        }

        console.log("hola" + this.props)
    }

    /** Meteodo que obtiene el candidato seleccionado */
    eventElement = value => {

        let val = value.nombre;
        console.log("este es" + val)

    }

    componentDidMount() {
        this._isMounted = true;
    }


    votar() {
        let data = { 'indice': this.state.element.posicion, 'dni': "123596" }
        console.log("posición " + this.state.element.posicion)



        let options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }


        fetch("http://192.168.96.37:5000/votar", options)
            .then(response => response.json())
            .then((responseJson) => {

                this.setState({
                    redirect: true
                }
                )
                console.log("este es response " + responseJson.estado)

                if (responseJson.estado == "Ha ocurrido un error") {
                    this.serverAlert();

                    console.log("error landita")
                }

                if (responseJson.estado == "Voto registrado con exito") {

                    /*this.props.history.push('/home')*/
                    this.toggleAlert();
                    console.log("vot registrado papa " + this.state.redirect)

                }

            }).catch(error => this.serverAlert()
            )

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




    toggleModal = value => {
        this.setState({
            modalIsopen: !this.state.modalIsopen,


        });

        this.setState({
            element: value

        });

        const element = value;

        console.log(element.nombre)
    }




    render() {
        const element = this.state.element;

        const candidat = this.state.Candidatos.map((cand, index) => {

            return (


                <div className="rows show-grid" key={index} >
                    <div className="col-xs-2 mb-5 ml-2">

                        <div className="card" onClick={this.toggleModal.bind(this, cand)} >
                            <img src={cand.bg} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <span className="dot">{cand.posicion}</span>
                                <h5 className="card-title">{cand.nombre}</h5>
                                <button type="button" className="btn btn-primary" onClick={this.toggleModal.bind(this, cand)}>Enviar Voto</button>

                            </div>

                        </div>
                        {/**<a href="#" className="btn btn-primary" onClick={this.eventElement.bind(this, cand)}>Enviar Voto</a> */}
                    </div>


                </div>



            )
        })


        {/**Este metodo return es que muestra todo el contenido que se desea de este componente*/ }

        return (

            <div className="Contenido">

                <Alert className="Alert_danger" color="danger" isOpen={this.state.visible1}>
                    Ha ocurrido un error en el sistema verifique su conexión en la red
                </Alert>

                <Alert className="Alert_succes" color="success" isOpen={this.state.visible}>
                    Ha realizado su voto por  {element.nombre}  correctamente
                </Alert>
                <div className="header-vot">
                    <img src={logo} className="Image_header" alt="Logo" />
                    <h1 className="title_text">Representante de Área</h1>
                    <p className="text">  Por favor elige un candidato</p>

                </div>

                <Modal isOpen={this.state.modalIsopen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>
                        <h1 className="title-Body"> ¿Seguro desea Votar por {element.nombre}?</h1>
                    </ModalHeader>

                    <ModalBody  >
                        <div className="card_body"  >
                            <img src={element.bg} className="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title_body">{element.nombre}</h5>
                            </div>

                        </div>

                    </ModalBody>

                    <ModalFooter>

                        <button type="button" className="btn btn-primary" onClick={this.votar.bind(this)}>Enviar voto</button>
                        <button type="button" className="btn btn-danger" onClick={this.toggleModal.bind(this)}>Cancelar </button>
                    </ModalFooter>
                </Modal>






                {candidat}
            </div>

        );
    }
}

export default nav;