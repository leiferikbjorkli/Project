import React, { PropTypes } from 'react';

import MapContainer from './MapContainer';


const MainContainer = () => (
  <main>
    <MapContainer />
  </main>
);

MainContainer.propTypes = {
  children: PropTypes.node,
};


export default MainContainer;
