import React from 'react' 
import styles from '../styles/PlayerInfo.module.css'

const PlayerInfo = props => (
    <div className = {styles.playerInfoContainer}>
        <div className = {styles.playerInfoContainerAvatar}>
            {/* później jakiś obrazek  */}
        </div>
        <p>{props.name}</p>
    </div>
)

export default PlayerInfo