import React from 'react'
import Table from './Table';
import Hand from './Hand'
import styles from'../styles/GameScreen.module.css'

import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import img5 from '../images/img5.jpg'
import img6 from '../images/img6.jpg'
import img7 from '../images/img7.jpg'
import img8 from '../images/img8.jpg'
import img9 from '../images/img9.jpg'
import img10 from '../images/img10.jpg'
import img11 from '../images/img11.jpg'
import img12 from '../images/img12.jpg'
import img13 from '../images/img13.jpg'
import img14 from '../images/img14.jpg'
import img15 from '../images/img15.jpg'
import img16 from '../images/img16.jpg'
import img17 from '../images/img17.jpg'

const data = [
  {id: 1, src: img1, title: 'Obrazek 1', description: "2019"},
  {id: 2, src: img2, title: 'Obrazek 1', description: "2019"},
  {id: 3, src: img3, title: 'Obrazek 1', description: "2019"},
  {id: 4, src: img4, title: 'Obrazek 1', description: "2019"},
  {id: 5, src: img5, title: 'Obrazek 1', description: "2019"},
  {id: 6, src: img6, title: 'Obrazek 1', description: "2019"},
  {id: 7, src: img7, title: 'Obrazek 1', description: "2019"},
  {id: 8, src: img8, title: 'Obrazek 1', description: "2019"},
  {id: 9, src: img9, title: 'Obrazek 1', description: "2019"},
  {id: 10, src: img10, title: 'Obrazek 1', description: "2019"},
  {id: 11, src: img11, title: 'Obrazek 1', description: "2019"},
  {id: 12, src: img12, title: 'Obrazek 1', description: "2019"},
  {id: 13, src: img13, title: 'Obrazek 1', description: "2019"},
  {id: 14, src: img14, title: 'Obrazek 1', description: "2019"},
  {id: 15, src: img15, title: 'Obrazek 1', description: "2019"},
  {id: 16, src: img16, title: 'Obrazek 1', description: "2019"},
  {id: 17, src: img17, title: 'Obrazek 1', description: "2019"},
] 

const initialHand = []
let k = Math.floor(Math.random()*7)
let initialTableCard = [];
for(let i=0; i<5; i++){
  initialHand[i] = data[k+i]
}

let startCardIndex = Math.floor(Math.random()*data.length)
initialTableCard.push(data[startCardIndex]);


class GameScreen extends React.Component {
    state = {
        cardsOnTable : [...initialTableCard], 
        cardsInHand : [...initialHand],
    }
   
    onDragStart = (e,v) =>{
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData( "text/plain", v )
    }

    allowDrop = e =>{
        e.preventDefault();
    }
   
    onDrop = (e, id, position) =>{
        const card = e.dataTransfer.getData("text/plain");
        let additionalCard = [...data].filter(item => item.id == card)
        let cardsOnTable = [...this.state.cardsOnTable];
        let index = this.state.cardsOnTable.findIndex(card => card.id == id)

        if(position === 'left'){
            let newCardsOnTable = []
            for(let i = 0; i<=cardsOnTable.length; i++){
                if( i < index){
                    newCardsOnTable[i] = cardsOnTable[i];
                }else if (i === index){
                    newCardsOnTable[i] = additionalCard[0];
                }else{
                    newCardsOnTable[i] = cardsOnTable[i-1];
                }
            }
            this.setState(prevState => ({
                cardsOnTable: newCardsOnTable,
                cardsInHand: prevState.cardsInHand.filter(item => item.id != card)
            }));
        }else{
            this.setState(prevState => ({
                cardsOnTable: [...prevState.cardsOnTable, additionalCard[0]],
                cardsInHand: prevState.cardsInHand.filter(item => item.id != card)
            }));
        }
        
    }

    render(){
        const {cardsOnTable, cardsInHand} = this.state
        return(
                <div className = {styles.gameScreen}>
                <div className = {styles.gameScreenOppLeft}>
                     <div className = {styles.gameLogo}></div>
                     <Hand class = 'vertical' initialHand = {cardsInHand} onDragStart = {this.onDragStart} />
                </div>
                <div className = {styles.gameScreenMidlle}>
                    <div className = {styles.gameScreenOppTop}>
                        <Hand class = 'horizontal' initialHand = {cardsInHand} onDragStart = {this.onDragStart} />
                    </div>
                    <div className = {styles.gameScreenTable}>
                         <Table cardsOnTable = {cardsOnTable} allowDrop = {this.allowDrop} onDrop = {this.onDrop}/>
                    </div>
                        
                    <div className = {styles.gameScreenOppBottom}>
                        <Hand class = 'horizontal' initialHand = {cardsInHand} onDragStart = {this.onDragStart} />
                    </div>
                </div>
                <div className = {styles.gameScreenOppRight}>
                         <Hand class = 'vertical' initialHand = {cardsInHand} onDragStart = {this.onDragStart} />
                </div>
                </div>
        )
    }
}

export default GameScreen

