import React from 'react'
import styles from '../styles/Card.module.css'

const Card = ({id, src, title, description, draggable, onDragStart, allowDrop, onDrop}) => (
    
    onDragStart ? (
    
            <div 
                id={id} 
                draggable = {draggable} 
                className = {styles.cardContainer}
                onDragStart={ (e) => onDragStart(e, id) }
            >   
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'left')} className = {styles.emptySpaceLeft}></div> : null}
                <img src = {src}
                     alt = {title}
                     className = {styles.img}
                />
                <h1 className = {styles.h1}>{title} </h1>
                <p className = {styles.p}>{description}</p>
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'right')} className = {styles.emptySpaceRight}></div> : null}
            </div>
         
        
    ):(
    
            <div 
                id={id} 
                className = {styles.cardContainer}
            >   
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'left')} className = {styles.emptySpaceLeft}></div> : null}
                <img src = {src}
                     alt = {title}
                     className = {styles.img}
                />
                <h1 className = {styles.h1}>{title} </h1>
                <p className = {styles.p}>{description}</p>
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'right')} className = {styles.emptySpaceRight}></div> : null}
            </div>
             
        
    )
    
)

export default Card