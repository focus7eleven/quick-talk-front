import React,{PropTypes} from 'react'
import styles from './LocationContainer.scss'
import classnames from 'classnames'
import MapComponent from './MapContainer'

const LocationComponent = React.createClass({
  getInitialState(){
    return {
      mode: 0,
    }
  },

  handlePickup(){
    // this.props.sizeUp();
    let leftPanel = this.refs.leftPanel;
    let mapPanel = this.refs.mapPanel;
    leftPanel.style.width = '800px';
    mapPanel.style.height = '500px';
    this.setState({mode:1});
    console.log(leftPanel.style);
  },

  handlePicked(){
    let leftPanel = this.refs.leftPanel;
    let mapPanel = this.refs.mapPanel;
    leftPanel.style.width = '400px';
    mapPanel.style.height = '300px';
    this.setState({mode:0});
  },

  render(){
    const {mode} = this.state;

    return (
      <div className={classnames(this.props.className,styles.container)} ref="leftPanel">
        <div className={styles.logo}>Chitchat</div>
        <div className={styles.mapContainer} ref="mapPanel">
          {
            !mode ?
            <MapComponent size="300px"></MapComponent>
            :
            <MapComponent size="500px"></MapComponent>
          }
        </div>
        {
          !mode ?
          <div>
            <div className={styles.tips}>1. Pick up a location first.</div>
            <div className={styles.tips}>2. Enjoy chatting with others!</div>
          </div>
          :
          null
        }
        {
          !mode ?
          <div className={styles.pickButton}>
            <button onClick={this.handlePickup}>Go pick up a location!</button>
          </div>
          :
          <div className={styles.pickButton}>
            <button onClick={this.handlePicked}>Start to chat!</button>
          </div>
        }
      </div>
    )
  }

})

export default LocationComponent
