import React from 'react'
import styles from './AppContainer.scss'
import ChatComponent from './containers/ChatContainer'
import LocationComponent from './containers/LocationContainer'
import io from 'socket.io-client';

const AppContainer = React.createClass({
  getInitialState(){
    return {
      nickname: "",
      hasNickname: false,
      // hasNickname: true,
      socket: null,
    }
  },

  componentWillMount(){
    const socket = io.connect('http://localhost:5050/mx-qq');
    this.setState({socket});
  },

  handleNickname(e){
    this.setState({nickname:e.target.value});
  },

  handlePressReturn(e){
    if(e.which === 13){
      this.setState({hasNickname:true});
    }
  },

  handlePostMessage(newMessage){
    console.log(newMessage);
  },

  render(){
    const {nickname,hasNickname,socket} = this.state;

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
            <ChatComponent className={styles.rightPanel} nickname={nickname} postMessage={this.handlePostMessage}></ChatComponent>
          </div>
        }
      </div>
    )
  }
})

export default AppContainer
