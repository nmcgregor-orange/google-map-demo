/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import mapTheme from '../../mapTheme';

const mapStyle = css`
  .mapSize {
    width: 100%;
    height: 100%;
  }
`;

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

  popUp() {
    return <InfoBox>
      <div>

      </div>
    </InfoBox>
  }

  render() {
    const { stores } = this.props;

    const storesList = stores ? (
    stores.map(store => {
        const JsonStore = JSON.parse(store);
        return <Marker 
            position={
              {
                lat: JsonStore.coordinates.latitude,
                lng: JsonStore.coordinates.longitude
              }
            }
            key={JsonStore.storeId} 
            >
            <div>
              {JsonStore.name}
            </div>
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