import { useState, useRef, useEffect } from "react";

import { Input, Button } from "../../components";

import SearchAddressItemList from "./comp/SearchAddressItemList";
import SearchAddressAddItem from "./comp/SearchAddressAddItem";

import "./SearchAddress.sass";

const SearchAddress = () => {
    const autoCompleteRef = useRef();
    const [inputRef, setInputRef] = useState();

    const [addressFound, setAddressFound] = useState(false);
    const [items, setItems] = useState([]);
    // useEffect(() => {
    //     console.log(window.google.maps);

    //     if (inputRef?.current) {
    //         autoCompleteRef.current =
    //             new window.google.maps.places.Autocomplete(inputRef.current);
    //     }
    // }, [inputRef]);

    return (
        <div className="search-address">
            <div className="search-address__header">Введите Адрес</div>
            <form className="search-address__form">
                <Input
                    placeholder="Адрес доставки"
                    style={{ marginBottom: "20px" }}
                    setRef={setInputRef}
                />
                {!addressFound ? (
                    <div className="search-address__form__el search-address__form__el_js-c">
                        <Button
                            text="Поиск"
                            action={() => setAddressFound(true)}
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
