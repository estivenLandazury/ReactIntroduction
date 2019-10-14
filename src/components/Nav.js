import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Candidatos } from '../utilities/pers.json';
import '../customerCss/customer.css';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Alert } from "reactstrap";
import { Modal } from "reactstrap";
import { ModalBody } from "reactstrap";
import { ModalFooter } from "reactstrap";
import { ModalHeader } from "reactstrap";

import logo from '../images/LOGOS-04.png'
import QRCode from 'react.qrcode.generator'
import Home from './Home';
import 'react-notifications/lib/notifications.css'





class nav extends Component {

    constructor(props) {

        super(props);

        document.createElement("a");


        this.state = {
            Candidatos,
            modalIsopen: false,
            element: "",
            visible: false,
            visible1: false,
            cambiar: false,
            clavesimetrica: "h",
            URL: "http://192.168.96.37:5000/"

        }
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


        fetch(this.state.URL + "votar", options)
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

                    this.setState({
                        clavesimetrica: responseJson.qr_credenciales
                    })

                    if (this.state.clavesimetrica !== "h") {
                        this.toggleAlert();
                        console.log("Vamos a imprimir")
                        this.download()
                    }

                    console.log("vot registrado papa " + responseJson.qr_credenciales)
                }
            }).catch(error => this.serverAlert()
            )

    }

    myFunction() {
        this.props.history.push('/home')
    }





    Qrgenerator(value) {


        if (value !== "h") {
            console.log("si  cambió" + value)
            return <div className="HpQrcode" id="" >

                <QRCode
                    value={"" + value}
                    size={200}
                    level={'H'}
                />
            </div >;


        } else if (value == "h") {
            console.log("no cambio " + value)

            return <div className="HpQrcode" id="" >

                <h1> Hola bb</h1>
            </div >;
        }



    }

    download() {
        const canvas = document.querySelector('.HpQrcode > canvas');
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = this.state.clavesimetrica + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        console.log("Image", this.pngUrl)


    }



    serverAlert() {
        this.setState({
            visible1: !this.state.visible1
        }, () => {
            window.setTimeout(() => {
                this.setState({ visible1: !this.state.visible1 })
            }, 5000)
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
        let credenciales = this.state.clavesimetrica;
        console.log("credencialesPrueba " + credenciales)
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

                {this.Qrgenerator(this.state.clavesimetrica)}


                {candidat}

            </div >

        );
    }
}

export default nav;