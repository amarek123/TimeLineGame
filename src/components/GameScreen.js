import React from 'react'
import Table from './Table';
import Hand from './Hand'
import styles from'../styles/GameScreen.module.css'

const {
    Stitch,
    RemoteMongoClient,
    GoogleRedirectCredential,
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
        const card = e.dataTransfer.getData("text/plain");
        console.log([...this.state.allCards])
        let additionalCard = [...this.state.allCards].filter(item => item.id == card)
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
                cardsInHandPlayer: prevState.cardsInHandPlayer.filter(item => item.id != card),
                cardsInHandOppLeft: prevState.cardsInHandOppLeft.filter(item => item.id != card),
                cardsInHandOppRight: prevState.cardsInHandOppRight.filter(item => item.id != card),
                cardsInHandOppTop: prevState.cardsInHandOppTop.filter(item => item.id != card)
            }));
        }else{
            this.setState(prevState => ({
                cardsOnTable: [...prevState.cardsOnTable, additionalCard[0]],
                cardsInHandPlayer: prevState.cardsInHandPlayer.filter(item => item.id != card),
                cardsInHandOppLeft: prevState.cardsInHandOppLeft.filter(item => item.id != card),
                cardsInHandOppRight: prevState.cardsInHandOppRight.filter(item => item.id != card),
                cardsInHandOppTop: prevState.cardsInHandOppTop.filter(item => item.id != card)
            }));
        }
        
    }
    getRandomCards = (allCards) =>{  
        let Cards = [...allCards];
        let initialHandPlayer = [];
        let initialHandOppLeft = [];
        let initialHandOppRight = [];
        let initialHandOppTop = [];
        let initialTableCard = [];
        for(let i = 0; i < 6; i++){    
            if(i<5){
                let randomIndex = Math.floor(Math.random() * Cards.length);
                initialHandPlayer.push(Cards[randomIndex])
                Cards.splice(randomIndex, 1);
            }
            if(i<5){
                let randomIndex = Math.floor(Math.random() * Cards.length);
                initialHandOppLeft.push(Cards[randomIndex])
                Cards.splice(randomIndex, 1);
            }
            if(i<5){
                let randomIndex = Math.floor(Math.random() * Cards.length);
                initialHandOppRight.push(Cards[randomIndex])
                Cards.splice(randomIndex, 1);
            }
            if(i<5){
                let randomIndex = Math.floor(Math.random() * Cards.length);
                initialHandOppTop.push(Cards[randomIndex])
                Cards.splice(randomIndex, 1);
            }else{
                let randomIndex = Math.floor(Math.random() * Cards.length);
                initialTableCard.push(Cards[randomIndex])
                Cards.splice(randomIndex, 1); 
            }
        }
        this.setState({
            allCards: [...allCards],
            remainigCards: [...Cards],
            cardsOnTable: [...initialTableCard],
            cardsInHandPlayer: [...initialHandPlayer],
            cardsInHandOppLeft: [...initialHandOppLeft],
            cardsInHandOppRight: [...initialHandOppRight],
            cardsInHandOppTop: [...initialHandOppTop]
        })
        console.log('w getrandomie ' + this.state.cardsOnTable[0].id)
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
        const {allCards,cardsOnTable, cardsInHandPlayer, cardsInHandOppLeft, cardsInHandOppRight, cardsInHandOppTop} = this.state
        return(
                <div className = {styles.gameScreen}>
                <div className = {styles.gameScreenOppLeft}>
                     <div className = {styles.gameLogo}></div>
                     <Hand class = 'vertical' initialHand = {cardsInHandOppLeft} onDragStart = {this.onDragStart} />
                </div>
                <div className = {styles.gameScreenMidlle}>
                    <div className = {styles.gameScreenOppTop}>
                        <Hand class = 'horizontal' initialHand = {cardsInHandOppTop} onDragStart = {this.onDragStart} />
                    </div>
                    <div className = {styles.gameScreenTable}>
                         <Table cardsOnTable = {cardsOnTable} allowDrop = {this.allowDrop} onDrop = {this.onDrop}/>
                    </div>
                        
                    <div className = {styles.gameScreenOppBottom}>
                        <Hand class = 'horizontal' initialHand = {cardsInHandPlayer} onDragStart = {this.onDragStart} />
                    </div>
                </div>
                <div className = {styles.gameScreenOppRight}>
                         <Hand class = 'vertical' initialHand = {cardsInHandOppRight} onDragStart = {this.onDragStart} />
                </div>
                </div>
        )
    }
}

export default GameScreen

