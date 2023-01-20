import { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

import { Input, Button } from "../../components";

import SearchAddressItemList from "./comp/SearchAddressItemList";
import SearchAddressAddItem from "./comp/SearchAddressAddItem";

import "./SearchAddress.sass";

const SearchAddress = () => {
    const [addressFound, setAddressFound] = useState(false);
    const [items, setItems] = useState([]);

    const [placeRef, setPlaceRef] = useState();

    const getCurrentPlace = () => {
        if (placeRef.current.value === "") return;

        console.log(placeRef.current.value);

        console.log(window.google.maps.places);
    };

    return (
        <div className="search-address">
            <div className="search-address__header">Введите Адрес</div>
            <form className="search-address__form">
                <Autocomplete>
                    <Input
                        placeholder="Адрес доставки"
                        style={{ marginBottom: "20px" }}
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

                        <SearchAddressItemList
                            items={items}
                            setItems={setItems}
                        />
                    </>
                )}
            </form>
        </div>
    );
};

export default SearchAddress;
