import React, { Component } from 'react';
import '../customerCss/Home.css';
import logo from '../images/LOGOS-04.png'
import { NavLink } from "react-router-dom";

class Home extends Component {

    render() {

        return (
            <div className="body">
                <div className="container">

                    <div className="page-header header-filter">

                        <div className="content-center brand">

                            <div className="squares square7" />

                            <div className="squares square6" />
                            <div className="squares square8" />

                            <img src={logo} className="home-logo" alt="Logo" />
                            <h1 className="h1-seo">BLK•Votar</h1>
                            <h3 className="d-sm-block">
                                Bienvenidos Al Sistema de Votación.</h3>
                            <NavLink to="/scan">
                                <button className="btn btn-primary" type="submit">Ingresar A Botar</button>
                            </NavLink>
                        </div>


                    </div>
                </div >
                <div className="squares square6" />
                <div className="squares square7" />


            </div>

        );

    }
}

export default Home;