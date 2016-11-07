import React,{PropTypes} from 'react'
import styles from './ChatContainer.scss'

const ChatComponent = React.createClass({
  getInitialState(){
    return {
    }
  },

  render(){
    return (
      <div className={styles.container}>chat</div>
    )
  }

})

export default ChatComponent
