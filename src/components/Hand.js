import React from 'react'
import Card from './Card'
import  '../styles/Hand.css'
import PlayerInfo from './PlayerInfo'

const Hand = props => {

    const cardsOnHand = [...props.initialHand].map( image => (
        <Card key = {image.id} {...image} draggable = {true} onDragStart={ props.onDragStart } />
    ));
    const classesHorizontal = [`tableContainerHorizontal`];
    const classesVertical = ['tableContainerVertical'];
    return(
        <div className = {props.class == 'vertical' ? classesVertical.join(' '): classesHorizontal.join(' ')}>
            <PlayerInfo name = 'Andrzej'/>
            {cardsOnHand} 
        </div>
        )
}

export default Hand