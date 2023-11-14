import React from 'react';
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Instruction, Label} from '../../../components/';
import {usePalette} from "color-thief-react";
import Color from "color";

const ShowCocktail = ({cocktail}) => {

    // Utilisation du hook usePalette
    const {data: paletteData, loading: paletteLoading} = usePalette(
        cocktail.strDrinkThumb || '',
        4,
        'hex',
        {
            crossOrigin: 'anonymous',
        }
    );

    // Création du style pour le fond de dégradé
    const gradientStyle = {
        background: paletteData
            ? `linear-gradient(to bottom right, 
              rgba(${Color(paletteData[0]).array().join(', ')}, 0.5), 
              rgba(${Color(paletteData[1]).array().join(', ')}, 0.5), 
              rgba(${Color(paletteData[2]).array().join(', ')}, 0.5), 
              rgba(${Color(paletteData[3]).array().join(', ')}, 0.5))`
            : 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Couleur du texte pour une meilleure visibilité
    };

    return (
        <div style={gradientStyle}>

            <Row className="align-items-center">
                <Col>
                    {cocktail.strDrinkThumb &&
                        <img className='shadow bg-body-tertiary rounded'
                             style={{width: 350, height: 350}}
                             src={cocktail.strDrinkThumb} alt=''
                        />
                    }
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{cocktail.strDrink}</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <Card.Text>
                                {cocktail.strInstructions && (
                                    <Instruction strInstructions={cocktail.strInstructions}/>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <Card.Text>
                                <Label content="Les ingrédients"></Label>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ShowCocktail;