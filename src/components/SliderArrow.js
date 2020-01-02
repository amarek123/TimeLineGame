import React from 'react'

const SliderArrow = (props) => (
    props.content === 'left' ? (
        (
            <div onClick = {props.handleClick} className = {props.class}><p>{props.content}</p></div>
        )
    ):(
        (
            <div onClick = {props.handleClick} className = {props.class}><p>{props.content}</p></div>
        )
    )
)

export default SliderArrow