import React from 'react'
import styles from './AppContainer.scss'
import ChatComponent from './containers/ChatContainer'
import LocationComponent from './containers/LocationContainer'

const AppContainer = React.createClass({
  getInitialState(){
    return {
      nickname: "",
      hasNickname: false,
      // hasNickname: true,
    }
  },

  handleNickname(e){
    this.setState({nickname:e.target.value});
  },

  handlePressReturn(e){
    if(e.which === 13){
      this.setState({hasNickname:true});
    }
  },

  render(){
    const {nickname,hasNickname} = this.state;

    return (
      <div className={styles.app}>
        {
          !hasNickname ?
          <div className={styles.banner}>
            <h1 className={styles.slogon}>Chitchat</h1>
            <input placeholder="your nickname" type="text" value={nickname} onChange={this.handleNickname} onKeyPress={this.handlePressReturn}/>
          </div>
          :
          <div className={styles.container}>
            <LocationComponent className={styles.leftPanel}></LocationComponent>
            <ChatComponent className={styles.rightPanel} nickname={nickname}></ChatComponent>
          </div>
        }
      </div>
    )
  }
})

export default AppContainer
