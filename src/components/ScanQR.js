import React, { Component } from "react";
import QrReader from "react-qr-reader";
import '../customerCss/Scan.css';
import { Redirect, Route, Router, BrowserRouter, NavLink } from 'react-router-dom'
import withUnmounted from '@ishawnwang/withunmounted';
import Nav from './Nav';
import { createBrowserHistory } from "history";
import { NotificationContainer, NotificationManager } from 'react-notifications';



import PropTypes from 'prop-types'
import { Alert } from "reactstrap";





class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result",
            dni: "",
            estado: false,
            visible: false,
            /* URL: "http://192.168.96.37:5000/"*/
            URL: "https://7396f703.ngrok.io/"





        };


        this.handleScan = this.handleScan.bind(this);
    }


    componentDidMount() {
        this._isMounted = true;



    }


    componentWillUnmount() {
        this._isMounted = false;

    }



    toggleAlert() {
        this.setState({
            visible: !this.state.visible
        }, () => {
            window.setTimeout(() => {
                this.setState({ visible: !this.state.visible })
            }, 5000)
        });



    }




/** Este método permite scanear  un código QR  que se enfoque hacia la camara WEB */
    handleScan(data) {

        if (data) {
            console.log(data)

            fetch(this.state.URL + "verificar", {
                method: 'PUT',
                body: JSON.stringify({ token: data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((responseJson) => {

                    console.log(responseJson.estado)
                    if (responseJson.estado == "True") {

                        this.setState({
                            estado: "True",
                            dni: "data"
                        })
                        console.log("excelent")

                    } else {

                        NotificationManager.error('Error message', 'El QR ya no es valido para votar', '3000');

                    }
                })
                .catch(error =>
                    NotificationManager.error('Error message', 'Ha ocorrido un error en el sistema', '3000'),

                )

        }



    }





    handleError(err) {
        console.error(err);
    }





    render() {
        const customHistory = createBrowserHistory();

        return (

            < div className="Scaner">

                <NotificationContainer></NotificationContainer>

                <Alert className="Alert_danger" id="dangerScan" color="danger" isOpen={this.state.visible}>
                    Su token de sesión no está hablitado para votar
                </Alert>

                <p className="Title_indi"> Scanea El código QR Para habilitar el Sistema</p>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />

                {
                    this.state.estado == "True" ? (

                        <Route history={customHistory} exact path="/nav" render={(props) => (<Nav {...props.match.params} dnii={this.state.dni} />)}>

                            <Redirect to={{
                                pathname: '/nav'

                            }}> </Redirect>

                        </Route>

                    ) : ("")
                }
            </div >
        );
    }
}

export default withUnmounted(Scan);
