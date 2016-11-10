import React,{PropTypes} from 'react'
import styles from './LocationContainer.scss'
import classnames from 'classnames'

const LocationComponent = React.createClass({
  getInitialState(){
    return {
    }
  },

  render(){
    return (
      <div className={classnames(this.props.className,styles.container)} >location</div>
    )
  }

})

export default LocationComponent
