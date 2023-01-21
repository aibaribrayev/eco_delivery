import React from "react";

import "./ShowTrucks.sass";

const ShowTrucks = ({ numberOfTrucks }) => {
    return (
        <div className="show-trucks">
            {new Array(+numberOfTrucks).fill(0).map((truck, index) => (
                <div className="show-trucks__item show-trucks__item_green">
                    <img src="svgs/truck.svg" alt="truck" />
                    Авто {index + 1}
                </div>
            ))}
        </div>
    );
};

export default ShowTrucks;
