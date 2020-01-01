import React from 'react'
import Card from './Card'
import styles from '../styles/Hand.module.css'

const Hand = props => {

    const cardsOnHand = [...props.initialHand].map( image => (
        <Card key = {image.id} {...image} draggable = {true} onDragStart={ props.onDragStart } />
    ))
    
    return(
        <div className = {styles.tableContainer}>
            {cardsOnHand} 
        </div>
        )
}

export default Hand