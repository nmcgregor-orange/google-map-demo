/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import mapTheme from '../../mapTheme';


class Map extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewport: {
        width: 2400,
        height: 1200,
        latitude: 39.5086,
        longitude: -96.1559,
        zoom: 5.2
      }
    };
  };

  // mapStyle = css`
  //   .mapSize {
  //     width: 100%;
  //     height: 100%;
  //   }

  //   @keyframes bounceIn {
  //     0% {
  //       transform: scale(0.1);
  //       opacity: 0;
  //     }
  //     60% {
  //       transform: scale(1.2);
  //       opacity: 1;
  //     }
  //     100% {
  //       transform: scale(1);
  //     }
  //   }

  //   .markerBounce {
  //     animation: bounceIn 2s;
  //   }
  // `;

  render() {
    const { stores } = this.props;

    const storesList = stores ? (
    stores.map(store => {
        const JsonStore = store;
        return <Marker 
            position={
              {
                lat: JsonStore.coordinates.latitude,
                lng: JsonStore.coordinates.longitude
              }
            }
            animation={2}
            key={JsonStore.storeId} 
            // icon={{
            //   url: `/mymarker.svg`,
            //   scaledSize: new window.google.maps.Size(25, 25)
            // }}
            >
            {/* <div>
              {JsonStore.name}
            </div> */}
        </Marker>
    })
    ) : null;

    return(
       <div className="mapSize">
         <GoogleMap
            defaultCenter = { { lat: 39.5086, lng: -96.1559 } }
            zoom = { this.state.viewport.zoom }
            defaultOptions = { { styles: mapTheme } }
          >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
            {storesList}
          </MarkerClusterer>
         </GoogleMap>  
       </div>
    );
  }
};
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;