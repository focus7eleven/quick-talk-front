import React,{PropTypes} from 'react'
import styles from './LocationContainer.scss'

const LocationComponent = React.createClass({
  getInitialState(){
    return {
    }
  },

  render(){
    return (
      <div className={styles.container}>location</div>
    )
  }

})

export default LocationComponent
