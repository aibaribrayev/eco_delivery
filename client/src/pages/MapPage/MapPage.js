import { useRef, useState } from 'react';

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

import { SearchAddress } from '../../modules';
import './MapPage.sass';

const center = { lat: 43.3176583, lng: 76.971492 };

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM',
    libraries: ['places'],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  if (!isLoaded) return <>Loading</>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <GoogleMap
        center={center}
        zoom={17}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        <div className="map__container">
          <SearchAddress setDirectionsResponse={setDirectionsResponse} />
        </div>
      </GoogleMap>
    </div>
  );
};

export default MapPage;
