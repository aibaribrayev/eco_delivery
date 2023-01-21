import React from "react";

import SearchAddressItem from "./SearchAddressItem";

const SearchAddressItemList = ({ items, setItems }) => {
    if (!items.length) return;

    const handleDelete = (id) => {
        setItems((prev) => {
            const temp = prev;
            const index = temp.findIndex((item) => item.id === id);

            const leftSide = temp.splice(0, index);
            const rightSide = temp.splice(index + 1, temp.length);

            return [...leftSide, ...rightSide];
        });
    };

    return (
        <div className="search-address__item-list">
            <div className="search-address__item-list__headers">
                <div className="search-address__item-list__header">
                    Название товара
                </div>
                <div className="search-address__item-list__header">Вес</div>
            </div>

            {items.map((item) => (
                <SearchAddressItem
                    key={item.id}
                    item={item}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default SearchAddressItemList;
