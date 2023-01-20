import { useState } from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { SearchAddress } from "../../modules";
import "./MapPage.sass";

const center = { lat: 48.8584, lng: 2.2945 };

const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM",
        libraries: ["places"],
    });
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    if (!isLoaded) return <>Loading</>;

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
            >
                <div className="map__container">
                    <SearchAddress />
                </div>
            </GoogleMap>
        </div>
    );
};

export default MapPage;
