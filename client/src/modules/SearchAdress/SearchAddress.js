import { Input } from "../../components";
import "./SearchAddress.sass";

const SearchAddress = () => {
    return (
        <div className="search-address">
            <div className="search-address__header">Введите Адрес</div>
            <div className="search-address__form">
                <Input placeholder="Адрес доставки" />
            </div>
        </div>
    );
};

export default SearchAddress;
