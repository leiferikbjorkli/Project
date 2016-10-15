import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google }) => {
  const style = {
    width: '100vw',
    height: '100wh',
  };
  return (
    <div style={style}>
      <Map google={google} />
    </div>
  );
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCl3upX4zA0Z_W0UQHEt8v5O2nR0PXTk6g',
})(MapContainer);
