import React,{PropTypes} from 'react'
import styles from './ChatContainer.scss'
import classnames from 'classnames'
import moment from 'moment'

const ChatComponent = React.createClass({
  getInitialState(){
    return {
      newMessage: "",
      userColor: "#000000",
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
    const num = (1<<24)*Math.random() | 0;
    const color = "#"+num.toString(16);
    // const color = "#000000";
    this.setState({userColor:color});
  },

  componentDidUpdate(){
    let messagePanel = this.refs.messagePanel;
    messagePanel.scrollTop = messagePanel.scrollHeight;
  },

  handlePressReturn(e){
    if(e.which === 13){
      const newMessage = {
        nickname: this.props.nickname,
        message: this.state.newMessage,
        time: moment(),
        color: this.state.userColor,
      };
      let newList = this.state.messageList;
      newList = newList.concat([newMessage]);
      this.setState({messageList:newList,newMessage:""});
      this.props.postMessage(newMessage);
    }
  },

  handleNewMessage(e){
    this.setState({newMessage:e.target.value});
  },

  render(){
    const {className,nickname} = this.props;

    const {messageList,userColor,newMessage} = this.state;

    return (
      <div className={classnames(className,styles.container)}>
        <div className={styles.messageList} ref="messagePanel">
          {
            messageList.map((m,index)=>{
              return (
                <div className={styles.message} key={m.time}>
                  <div className={styles.avatarContainer}><div className={styles.avatar} style={{'backgroundColor':m.color}}>{m.nickname.slice(0,1)}</div></div>
                  <div className={styles.textContainer}>
                    <div className={styles.nameAndTime}>
                      <span>{m.nickname}</span>
                      <span>{moment(m.time).format("MMM Do HH:mm:ss")}</span>
                    </div>
                    <div className={styles.text}>{m.message}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.footer}>
          <div className={styles.avatarContainer}><div className={styles.avatar} style={{'backgroundColor':userColor}}>{nickname.slice(0,1)}</div></div>
          <div>
            <input placeholder="Click here to type a chat message" value={newMessage} onChange={this.handleNewMessage} onKeyPress={this.handlePressReturn}/>
          </div>
        </div>
      </div>
    )
  }

})

export default ChatComponent
