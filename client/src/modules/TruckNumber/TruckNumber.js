import { Input, Button } from "../../components";

const TruckNumber = ({ setNumberOfTracks }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        setNumberOfTracks(e.target.truck_number.value);
    };

    return (
        <div className="search-address">
            <div className="search-address__header">Кол-во машин</div>
            <form className="search-address__form" onSubmit={handleSubmit}>
                <Input
                    placeholder="Кол-во машин для доставки"
                    name="truck_number"
                    style={{ marginBottom: "20px" }}
                />
                <div className="search-address__form__el search-address__form__el_jc-c">
                    <Button text="Поиск" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default TruckNumber;
