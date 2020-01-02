import React from 'react'
import Card from './Card'
import styles from '../styles/Table.module.css'
import SliderArow from './SliderArrow'

class Table extends React.Component {
    
    state = {
        index : 0,
    }
    
    handleClickLeft = () =>{
        this.setState(prevState => ({
            index: prevState.index - 1,
        }))
    }
    handleClickRight = () =>{
        this.setState(prevState => ({
            index: prevState.index + 1,
        }))
    }

    render(){

        const cardsOnTable = [...this.props.cardsOnTable].map( image => (
            <>  
              <Card allowDrop = {this.props.allowDrop} onDrop ={this.props.onDrop} key = {image.id} {...image}/>     
            </>
        ));
        return(
        <div className = {styles.tableContainer}>
            <SliderArow 
                handleClick = {(this.props.cardsOnTable.length > 5 && this.state.index > 0 ) ? this.handleClickLeft: null} 
                class = {styles.leftArrow} 
                content = {'left'}
            />
                <div className = {styles.cardsContainer}>
                    {cardsOnTable.splice(this.state.index, 5)}  
                    {console.log(this.state.index)}        
                </div>
            <SliderArow 
                handleClick =  {(this.props.cardsOnTable.length > 5 && this.state.index < (this.props.cardsOnTable.length - 5)) ? this.handleClickRight: null}  
                 class = {styles.rightArrow} 
                 content = {'right'}
            />
            
        </div>    
        )
    }
}

export default Table 
