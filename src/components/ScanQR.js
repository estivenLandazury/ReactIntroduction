import React, { Component, Alert } from "react";
import QrReader from "react-qr-reader";
import '../customerCss/Scan.css';
import { Redirect, Route, Router, BrowserRouter, NavLink } from 'react-router-dom'
import withUnmounted from '@ishawnwang/withunmounted';
import Nav from './Nav';
import { createBrowserHistory } from "history";

import PropTypes from 'prop-types'




class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result",
            dni: "",
            estado: false,
            visible: false


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





    handleScan(data) {


        if (data) {

            console.log(data)

            fetch("http://192.168.96.37:5000/verificar", {
                method: 'PUT',
                body: JSON.stringify({ token: data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((responseJson) => {

                    console.log(responseJson)
                    if (responseJson == "True") {

                        this.setState({
                            estado: "True",
                            dni: "data"
                        })
                        console.log("excelent")

                    } else {

                        this.setState({
                            result: "QR No Es valido"
                        })

                    }
                })
                .catch(error => console.log(error + "que paso manito"))

        }



    }





    handleError(err) {
        console.error(err);
    }





    render() {
        const customHistory = createBrowserHistory();

        return (



            < div className="Scaner" >



                <p className="Title_indi"> Scanea El código QR Para habilitar el Sistema</p>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />

                <p>{this.state.result}</p>









            </div >
        );
    }

}

export default withUnmounted(Scan);
