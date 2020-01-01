import React from 'react'
import Card from './Card'
import styles from '../styles/Table.module.css'

const Table = (props) => {
    
    const cardsOnTable = [...props.cardsOnTable].map( image => (
    <>  
      <Card allowDrop = {props.allowDrop} onDrop ={props.onDrop} key = {image.id} {...image}/>     
    </>
    ));


        return(
            <div className = {styles.tableContainer} >
                {cardsOnTable}         
            </div>
        )
}

export default Table 
