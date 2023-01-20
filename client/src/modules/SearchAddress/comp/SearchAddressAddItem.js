import { Button, Input } from "../../../components";

const SearchAddressAddItem = () => {
    const handleItem = (e) => {
        e.preventDefault();

        console.log(e.target);
    };

    return (
        <>
            <div
                className="search-address__form__el_jc-spbt"
                style={{ marginBottom: "20px" }}
            >
                <Input
                    placeholder="Название товара"
                    style={{ width: "60%" }}
                    label="Название товара"
                    name="item_name"
                />
                <Input
                    placeholder="0.0 кг"
                    label="Вес"
                    name="item_weight"
                    style={{ width: "30%" }}
                />
            </div>
            <div className="search-address__form__el search-address__form__el_js-flend">
                <Button text="Добавить" type="outline" action={handleItem} />
            </div>
        </>
    );
};

export default SearchAddressAddItem;
