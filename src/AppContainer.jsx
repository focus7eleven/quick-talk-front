import React from 'react'
import styles from './AppContainer.scss'
import ChatComponent from './containers/ChatContainer'
import LocationComponent from './containers/LocationContainer'
import io from 'socket.io-client';

let socket = io.connect('http://localhost:5050/mx-qq');

const AppContainer = React.createClass({
  getInitialState(){
    return {
      nickname: "",
      hasNickname: false,
      // hasNickname: true,
      socket: null,
      userColor: "#000000",
      selectedPoi: {lng: 118.780612, lat: 32.054366},
      id: 0,
      messageList: [
        {
          nickname: 'Kdot',
          message: 'If I told you that a flower bloomed in a dark room would you trust it',
          time: 1410715640523,
          color: "#d9d9d9"
        },
        {
          nickname: '吴迪',
          message: '元宝宝，宝宝元',
          time: 1410715610579,
          color: "#926dea",
        },
        {
          nickname: '硕总',
          message: '给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶给大佬递茶',
          time: 1410715140572,
          color: "#842232",
        },
        {
          nickname: '哔总',
          message: '必总还是稳',
          time: 1410715642579,
          color: "#234667",
        },
      ],
    }
  },

  componentWillMount(){
    // this.setState({socket});
    socket.on("get-id", (data) => {
      console.log("id returned: ",data);
      this.setState({id:data})
      const newUser = {id: data,selectedPoi: this.state.selectedPoi};
      socket.emit("new-user",newUser);
    });
    const num = (1<<24)*Math.random() | 0;
    const color = "#"+num.toString(16);
    // const color = "#000000";
    this.setState({userColor:color});
  },

  componentDidMount(){
    socket.on("new-message",(data) => {
      console.log("new: ",data);
      let newMessageList = this.state.messageList;
      newMessageList = newMessageList.concat([data]);
      this.setState({messageList:newMessageList});
    });
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
    socket.emit("post-message",newMessage);
  },

  handleUpdateLocation(location){
    console.log("update loc: ",location);
    const newLocation = {lng: location.lng, lat: location.lat};
    this.setState({selectedPoi:newLocation});
    socket.emit("update-location",newLocation);
  },

  render(){
    const {nickname,hasNickname,socket,userColor,id,messageList} = this.state;

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
            <LocationComponent className={styles.leftPanel} updateLocation={this.handleUpdateLocation}></LocationComponent>
            <ChatComponent className={styles.rightPanel} id={id} nickname={nickname} userColor={userColor} postMessage={this.handlePostMessage} messageList={messageList}></ChatComponent>
          </div>
        }
      </div>
    )
  }
})

export default AppContainer
