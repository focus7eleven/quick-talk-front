import React,{PropTypes} from 'react'
import styles from './MapContainer.scss'
import classnames from 'classnames'

const MapComponent = React.createClass({
  getInitialState(){
    return {
        selectedPoi: [118.780612, 32.054366]
    }
  },

  componentDidMount()
  {
      AMap.service(["AMap.Geocoder"], () => {
            const options = {
                city: "南京市"
            };
            this.geocoder = new AMap.Geocoder(options);
        });

      this.map = new AMap.Map('mapview',{
          zoom: 16,
          mapStyle: "dark",
          center: [118.780612, 32.054366]
      });

      this.selectedPoiMarker = new AMap.Marker({
          position: this.state.selectedPoi,
          title: "当前位置",
          map: this.map
      });

      this.map.on("click", this.handleMapClick);

  },

  handleMapClick(e)
  {
      this.selectedPoiMarker.setPosition(e.lnglat);
      this.geocoder.getAddress(e.lnglat, (status, result) => {
          console.log(e.lnglat);
          alert(result.regeocode.formattedAddress);
      });
      this.setState({
          selectedPoi: e.lnglat
      });
  },

  render(){
    return (
      <div className={styles.map}>
          <div id="mapview" className={styles.mapview}></div>
      </div>
    )
  }

})

export default MapComponent
