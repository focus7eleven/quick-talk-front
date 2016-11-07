import React from 'react'
import styles from './AppContainer.scss'
import ChatComponent from './containers/ChatContainer'
import LocationComponent from './containers/LocationContainer'

const AppContainer = React.createClass({
  getInitialState(){
    return {
    }
  },

  render(){
    return (
      <div className={styles.app}>
        <LocationComponent></LocationComponent>
        <ChatComponent></ChatComponent>
      </div>
    )
  }
})

export default AppContainer
