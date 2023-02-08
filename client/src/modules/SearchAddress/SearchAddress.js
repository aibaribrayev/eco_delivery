import { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

import { Input, Button } from '../../components';

import SearchAddressItemList from './comp/SearchAddressItemList';
import SearchAddressAddItem from './comp/SearchAddressAddItem';

import './SearchAddress.sass';

const SearchAddress = ({ setDirectionsResponse }) => {
  const [addressFound, setAddressFound] = useState(false);
  const [items, setItems] = useState([]);

  const [placeRef, setPlaceRef] = useState();
  const google = window.google;

  const getCurrentPlace = () => {
    if (placeRef.current.value === '') return;
    console.log(placeRef.current.value);
    let origin = 'улица Федосеева 50a, Алматы, Kazakhstan';
    var directionsService = new google.maps.DirectionsService();

    // const icon = {
    //   url: place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(25, 25),
    // };
    let waypts = [
      {
        location: 'Рустем Бесагаш, Talgar Route, Tuzdybastau, Kazakhstan',
        stopover: true,
      },
    ];
    var request = {
      origin: origin,
      destination: placeRef.current.value,
      //waypoints: waypts,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    };
    directionsService.route(request, (result, status) => {
      console.log(result.routes[0].legs[0].duration.text);
      setDirectionsResponse(result);
    });
  };

  return (
    <div className="search-address">
      <div className="search-address__header">Введите Адрес</div>
      <form className="search-address__form">
        <Autocomplete>
          <Input
            placeholder="Адрес доставки"
            style={{ marginBottom: '20px' }}
            setRef={setPlaceRef}
          />
        </Autocomplete>
        {!addressFound ? (
          <div className="search-address__form__el search-address__form__el_js-c">
            <Button
              text="Поиск"
              action={() => {
                setAddressFound(true);
                getCurrentPlace();
              }}
            />
          </div>
        ) : (
          <>
            <SearchAddressAddItem />

            <SearchAddressItemList items={items} setItems={setItems} />
          </>
        )}
      </form>
    </div>
  );
};

export default SearchAddress;
