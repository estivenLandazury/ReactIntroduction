import React, { Component } from 'react';

import { Candidatos } from '../utilities/pers.json';
import '../customerCss/customer.css';



console.log(Candidatos);
class nav extends Component {

    constructor() {
        {/* Este método es el primero que se ejecuta antes del render*/ }

        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super();

        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            Candidatos
        }

    }

    render() {



        const candidat = this.state.Candidatos.map((cand) => {

            return (
                    <div className="row justify-content-between">

                        <div className="col-sm-6 col-md-4">
                            <div className="card"  >
                                <img src={cand.imagen} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{cand.nombre}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Votar por mi</a>
                                </div>

                            </div>
                        </div>



                    </div>

            )
        })


        {/**Este metodo return es que muestra todo el contenido que se desea de este componente*/ }
        return (
            <div>{candidat}</div>
        );
    }
}

export default nav;