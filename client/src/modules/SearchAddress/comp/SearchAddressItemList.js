import React from "react";

import SearchAddressItem from "./SearchAddressItem";

const SearchAddressItemList = ({ items, setItems }) => {
    if (!items.length) return;

    return (
        <div className="search-address__item-list">
            {items.map((item) => {
                <SearchAddressItem item={item} />;
            })}
        </div>
    );
};

export default SearchAddressItemList;
