import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { TipoEleccion } from '../utilities/tipo.json';
import '../customerCss/tip.css';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';


class tipo extends Component {

    constructor() {
        {/* Este método es el primero que se ejecuta antes del render*/ }

        {/* Con el método super heredo todas la funcionalidades de react*/ }
        super();

        {/* State me indica el estado en el que están los datos en la aplicación react
    especificamente en este componente*/}
        this.state = {
            TipoEleccion,
            activeIndex: 0

        }

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === TipoEleccion.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? TipoEleccion.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const tipo = this.state.TipoEleccion.map((tip, index) => {

            return (


                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={index}>

                    <div className="Conatiner">
                        <div className="circle">


                            <div className="rows show-grid"  >
                                <div className="col-xs-2 mb-5 ml-2">
                                    <NavLink className="url-tip" to={tip.url}>
                                        <div className="cardi" >
                                            <img src={tip.Imagen} className="card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">{tip.nombreElecion}</h5>

                                            </div>

                                        </div>
                                    </NavLink>
                                    {/**<a href="#" className="btn btn-primary" onClick={this.eventElement.bind(this, cand)}>Enviar Voto</a> */}
                                </div>


                            </div>
                        </div>



                    </div>
                </CarouselItem>

            );
        })






        return (
            <div>
                <div className="header">
                    <h1 className="Title-header">  Elige el tipo de elección que deseas</h1>

                </div>

                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={TipoEleccion} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {tipo}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>

            </div>



        );
    }

}

export default tipo;

