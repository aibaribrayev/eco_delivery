import { useState } from "react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { Map, SearchAddress } from "../../modules";
import "./MapPage.sass";

const render = (status) => {
    return <h1>{status}</h1>;
};

const MapPage = () => {
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = useState(3);
    const [center, setCenter] = useState({
        lat: 49.5219664,
        lng: 68.6505615,
    });

    const onClick = (e) => {
        setClicks([...clicks, e.latLng]);
    };

    const onIdle = (m) => {
        setZoom(m?.getZoom());
        setCenter(m?.getCenter()?.toJSON());
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Wrapper
                apiKey="AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM"
                render={render}
            >
                <Map
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%" }}
                >
                    {/* {clicks.map((latLng, i) => ( */}
                    {/* <Marker key={i} position={latLng} /> */}
                    {/* ))} */}
                    <div className="map__container">
                        <SearchAddress />
                    </div>
                </Map>
            </Wrapper>
        </div>
    );
};

export default MapPage;
