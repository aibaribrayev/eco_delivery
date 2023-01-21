import { Button } from "../../components";

import DeliveryAddressesItem from "./comp/DeliveryAddressesItem";

import "./DeliveryAddresses.sass";

const DeliveryAddresses = ({ addresses, setAddresses, setAddressesAdded }) => {
    const handleAddressDelete = (id) => {
        setAddresses((prev) => {
            const temp = prev;
            const index = temp.findIndex((item) => item.id === id);

            const leftSide = temp.slice(0, index);
            const rightSide = temp.slice(index + 1, temp.length);

            return [...leftSide, ...rightSide];
        });
    };

    const handleCancel = () => {
        setAddresses([]);
    };

    const handleDone = () => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
        setAddressesAdded(true);
        handleCancel();
    };

    return (
        <div className="delivery-addresses">
            <div className="delivery-addresses__header">Адреса доставки</div>

            <div className="delivery-addresses__items">
                {addresses.map((address) => (
                    <DeliveryAddressesItem
                        address={address}
                        setAddresses={setAddresses}
                        handleAddressDelete={handleAddressDelete}
                    />
                ))}
            </div>

            <div className="search-address__form__el search-address__form__el_jc-spbt">
                <Button
                    text="Отмена"
                    styleType="outline"
                    style={{ width: "40%" }}
                    action={handleCancel}
                />
                <Button
                    text="Готово"
                    style={{ width: "40%" }}
                    action={handleDone}
                />
            </div>
        </div>
    );
};

export default DeliveryAddresses;
