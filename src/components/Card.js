import React from 'react'
import  '../styles/Card.css'

const Card = ({id, src, title, description, draggable, onDragStart, allowDrop, onDrop}) => (
    
    onDragStart ? (
    
            <div 
                id={id} 
                draggable = {draggable} 
                className = 'cardContainer'
                onDragStart={ (e) => onDragStart(e, id) }
            >   
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'left')} className = 'emptySpaceLeft'></div> : null}
                <img src = {src}
                     alt = {title}
                     className = 'img'
                />
                <h1 className = 'h1'>{title} </h1>
                <p className = 'p'>{description}</p>
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'right')} className = 'emptySpaceRight'></div> : null}
            </div>
         
        
    ):(
    
            <div 
                id={id} 
                className = 'cardContainer'
            >   
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'left')} className = 'emptySpaceLeft'></div> : null}
                <img src = {src}
                     alt = {title}
                     className = 'img'
                />
                <h1 className = 'h1'>{title} </h1>
                <p className = 'p'>{description}</p>
                {allowDrop ? <div  onDragOver={allowDrop} onDrop={(e) => onDrop(e,id,'right')} className = 'emptySpaceRight'></div> : null}
            </div>
             
        
    )
    
)

export default Card