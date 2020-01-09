import React from 'react'
import Table from './Table';
import Hand from './Hand'
import styles from'../styles/GameScreen.module.css'

const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
  } = require('mongodb-stitch-browser-sdk');
  

class GameScreen extends React.Component {
    state = {
        allCards : [],
        remainigCards: [],
        cardsOnTable : [], 
        cardsInHandPlayer : [],
        cardsInHandOppLeft : [],
        cardsInHandOppRight : [],
        cardsInHandOppTop : [],
    }
   
    onDragStart = (e,v) =>{
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData( "text/plain", v )
    }

    allowDrop = e =>{
        e.preventDefault();
    }
   
    onDrop = (e, id, position) =>{
        const card = [...this.state.allCards].filter(item => item.id === e.dataTransfer.getData("text/plain"));
        let additionalTableCardDescription = card[0].description;
        let player = this.setPlayer(e.dataTransfer.getData("text/plain"));
        let index = this.state.cardsOnTable.findIndex(card => card.id === id) ;
        const isValidate = this.validation(position, index, additionalTableCardDescription);
        this.changeCardsOnTable(isValidate, card, index, player );
    }
    
    setPlayer = (id) => {
        if(this.state.cardsInHandOppLeft.findIndex(card => card.id === id) !== -1){
            return 'cardsInHandOppLeft'
        }
        else if(this.state.cardsInHandOppRight.findIndex(card => card.id === id) !== -1){
            return 'cardsInHandOppRight'
        }
        else if(this.state.cardsInHandOppTop.findIndex(card => card.id === id) !== -1){
            return 'cardsInHandOppTop'
        }
        else if(this.state.cardsInHandPlayer.findIndex(card => card.id === id) !== -1){
            return 'cardsInHandPlayer'
        }

    }

    validation = (position, index, additionalTableCardDescription) =>{
        const cardsOnTable = [...this.state.cardsOnTable]
        let isCorrect = false;

        if(cardsOnTable.length === 1 && additionalTableCardDescription < cardsOnTable[index].description && position === 'left'){
            isCorrect = true;
        }else if(index === (cardsOnTable.length - 1) && additionalTableCardDescription > cardsOnTable[index].description && position === 'right'){
            isCorrect = true;
        }else if(index === (cardsOnTable.length - 1) && additionalTableCardDescription < cardsOnTable[index].description && position==='left'&& additionalTableCardDescription> cardsOnTable[index -1].description){
            isCorrect = true;
        }else if( (index - 1) >= 0 && additionalTableCardDescription > cardsOnTable[index - 1].description && additionalTableCardDescription < cardsOnTable[index].description && 
                    index !== (cardsOnTable.length - 1) && position === 'left'){
            isCorrect = true;
        }else if((index - 1) < 0 && additionalTableCardDescription < cardsOnTable[index].description  && index !== (cardsOnTable.length - 1)){
            isCorrect = true;
        }
        
        if(isCorrect){
            return true
        }else{
            return false
        }
    }

    changeCardsOnTable = (isValidate, card, index, player) => {
        if(isValidate){    
            this.addCardToTable(this.state.cardsOnTable, index, card[0])
            this.removeCardFromHand(player,card[0].id)            
        }else{
            this.removeCardFromHand(player,card[0].id)   
            this.addNewCardToHand(player)
        }

    }

    addCardToTable = (cardsOnTable, index, card) => {
        let newCardsOnTable = []
            for(let i = 0; i< cardsOnTable.length; i++){
                if( i < index){
                    newCardsOnTable[i] = cardsOnTable[i];
                }else if (i === index && cardsOnTable[i].description > card.description){
                     newCardsOnTable[i] = card;
                     newCardsOnTable[i+1] = cardsOnTable[i];
                }else if (i === index && cardsOnTable[i].description < card.description){
                    newCardsOnTable[i] = cardsOnTable[i];
                    newCardsOnTable[i+1] = card;
                }else{
                    newCardsOnTable[i+1] = cardsOnTable[i];
                }
            }
            this.setState({
                cardsOnTable : newCardsOnTable,
            })
    }

    removeCardFromHand = (player, card) => {
        this.setState(prevState => ({
            [player]: prevState[player].filter(item => item.id !== card),
        }))
    }

    addNewCardToHand = (player) => {
        let randomIndex = Math.floor(Math.random() * this.state.remainigCards.length);
        let penaltyCard = this.state.remainigCards[randomIndex];
        this.setState(prevState =>({
            remainigCards: prevState.remainigCards.filter(cards => cards.id !== penaltyCard.id ),
            [player]: [...prevState[player], penaltyCard],
        }))
    }

    dealCards = (howMany, Cards) =>{
        let initialHand = [];
        let randomIndex;
        for(let i = 0; i < howMany; i++){ 
            if(i<5){
                randomIndex = Math.floor(Math.random() * Cards.length);
                initialHand = [...initialHand, Cards[randomIndex]];
                Cards.splice(randomIndex, 1);
            }
        }   
        return initialHand
    }

    getRandomCards = (allCards) =>{  
        let Cards = [...allCards];
        let initialHandPlayer = this.dealCards(5, Cards);
        let initialHandOppLeft = this.dealCards(5, Cards);
        let initialHandOppRight = this.dealCards(5, Cards);
        let initialHandOppTop = this.dealCards(5, Cards);
        let initialTableCard = this.dealCards(1, Cards);
        
        this.setState({
            allCards: [...allCards],
            remainigCards: [...Cards],
            cardsOnTable: [...initialTableCard],
            cardsInHandPlayer: [...initialHandPlayer],
            cardsInHandOppLeft: [...initialHandOppLeft],
            cardsInHandOppRight: [...initialHandOppRight],
            cardsInHandOppTop: [...initialHandOppTop]
        })
    }


    componentDidMount(){
        const client = Stitch.initializeDefaultAppClient('timelinelike-oznce');

        const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('Timelinelike');

        client.auth.loginWithCredential(new AnonymousCredential());

        db.collection('Cards')
        .find({})
        .toArray().then(data => {
            const allCards = data.filter(item => item.photoUrl !== '' && item.photoUrl !== null).map(item =>{
                return{
                id: item._id.id.toJSON().data.join(''),
                src: item.photoUrl,
                title: item.name,
                description: item.value
                }
            })
            return allCards
        })
        .then(allCards => this.getRandomCards(allCards))
    }
    
    render(){
        const {cardsOnTable, cardsInHandPlayer, cardsInHandOppLeft, cardsInHandOppRight, cardsInHandOppTop} = this.state
        return(
                <div className = {styles.gameScreen}>
                <div className = {styles.gameScreenOppLeft}>
                     <div className = {styles.gameLogo}></div>
                     <Hand player = {1} class = 'vertical' initialHand = {cardsInHandOppLeft} onDragStart = {this.onDragStart} />
                </div>
                <div className = {styles.gameScreenMidlle}>
                    <div className = {styles.gameScreenOppTop}>
                        <Hand player = {2} class = 'horizontal' initialHand = {cardsInHandOppTop} onDragStart = {this.onDragStart} />
                    </div>
                    <div className = {styles.gameScreenTable}>
                         <Table cardsOnTable = {cardsOnTable} allowDrop = {this.allowDrop} onDrop = {this.onDrop}/>
                    </div>
                        
                    <div className = {styles.gameScreenOppBottom}>
                        <Hand player = {0} class = 'horizontal' initialHand = {cardsInHandPlayer} onDragStart = {this.onDragStart} />
                    </div>
                </div>
                <div className = {styles.gameScreenOppRight}>
                         <Hand player = {3} class = 'vertical' initialHand = {cardsInHandOppRight} onDragStart = {this.onDragStart} />
                </div>
                </div>
        )
    }
}

export default GameScreen

