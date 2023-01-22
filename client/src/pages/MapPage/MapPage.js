import { useState } from "react";

import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";

import {
    SearchAddress,
    DeliveryAddresses,
    TruckNumber,
    ShowTrucks,
    DeliveryAddressesItem,
} from "../../modules";

import "./MapPage.sass";
import "./loader.css";

const center = { lat: 43.258227, lng: 76.8890358 };

const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM",
        libraries: ["places"],
    });
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    const [addresses, setAddresses] = useState([]);
    const [addressesAdded, setAddressesAdded] = useState(false);
    const [numberOfTrucks, setNumberOfTrucks] = useState(0);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [activeTruck, setActiveTruck] = useState(0);
    const [paths, setPaths] = useState(null);

    if (!isLoaded) {
        return (
            <div className="loader-container">
                <span class="loader"></span>
            </div>
        );
    }

    if (numberOfTrucks && !paths) {
        return (
            <div className="loader-container">
                <span class="loader"></span>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <GoogleMap
                center={center}
                zoom={11}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
            >
                <>
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                    {addressesAdded && !numberOfTrucks ? (
                        <div className="map__container-center">
                            <TruckNumber
                                setNumberOfTracks={setNumberOfTrucks}
                                addresses={addresses}
                                setPaths={setPaths}
                            />
                        </div>
                    ) : !numberOfTrucks ? (
                        <>
                            <div className="map__container-right">
                                <SearchAddress
                                    setAddresses={setAddresses}
                                    setDirectionsResponse={
                                        setDirectionsResponse
                                    }
                                />
                            </div>
                            {addresses.length ? (
                                <div className="map__container-left">
                                    <DeliveryAddresses
                                        addresses={addresses}
                                        setAddresses={setAddresses}
                                        setAddressesAdded={setAddressesAdded}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        paths && (
                            <>
                                <div
                                    className="map__container-left"
                                    style={{ minWidth: "500px" }}
                                >
                                    <DeliveryAddressesItem
                                        address={addresses[activeTruck + 1]}
                                        setAddresses={setAddresses}
                                    />
                                </div>
                                <div className="map__container-right">
                                    <ShowTrucks
                                        numberOfTrucks={numberOfTrucks}
                                        activeTruck={activeTruck}
                                        setActiveTruck={setActiveTruck}
                                        paths={paths}
                                        addresses={addresses}
                                    />
                                </div>
                            </>
                        )
                    )}
                </>
            </GoogleMap>
        </div>
    );
};

export default MapPage;
