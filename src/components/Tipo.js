import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { TipoEleccion } from '../utilities/tipo.json';

class tipo extends Component {

    constructor() {
        {/* Este método es el primero que se ejecuta antes del render*/ }

        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super();

        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            TipoEleccion

        }

    }

    render() {

        const tipo = this.state.TipoEleccion.map((tip, index) => {

            return (
                <div></div>
            );
        })






        return (
            <div>
                <h1>Hola soy el nuevo componente</h1>

            </div>



        );
    }

}

export default tipo;

