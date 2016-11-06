import React from 'react'
import styles from './AppContainer.scss'

const AppContainer = React.createClass({
  getInitialState(){
    return {
    }
  },

  render(){
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div>give boss a cup of tea</div>
        </div>
      </div>
    )
  }
})

export default AppContainer
