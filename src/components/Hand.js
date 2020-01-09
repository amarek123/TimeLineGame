import React from 'react'
import Card from './Card'
import  '../styles/Hand.css'
import PlayerInfo from './PlayerInfo'
import avatar1 from '../avatars/man-156584_1280.png'
import avatar2 from '../avatars/man-3414477_1280.png'
import avatar3 from '../avatars/blonde-149859_1280.png'
import avatar4 from '../avatars/avatar-2109804_1280.png'

const Hand = props => {
    const names = [
        {name : 'Andrzej', img : avatar1},
        {name : 'Karolina', img : avatar3}, 
        {name : 'Kukufas', img : avatar2}, 
        {name : 'Dżesika', img : avatar4}
    ];

    const players = names.map(player => (
        <PlayerInfo img = {player.img} name = {player.name}/>
    ))

    const cardsOnHand = [...props.initialHand].map( image => (
        <Card visible = {false} key = {image.id} {...image} draggable = {true} onDragStart={ props.onDragStart } />
    ));
    const classesHorizontal = [`tableContainerHorizontal`];
    const classesVertical = ['tableContainerVertical'];
    return(
        <div className = {props.class === 'vertical' ? classesVertical.join(' '): classesHorizontal.join(' ')}>
            {players[props.player]}
            {cardsOnHand} 
        </div>
        )
}

export default Hand