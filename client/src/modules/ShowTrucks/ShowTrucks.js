import React from "react";

import "./ShowTrucks.sass";

const ShowTrucks = ({ numberOfTrucks, activeTruck, setActiveTruck }) => {
    console.log(numberOfTrucks);

    return (
        <div
            className="show-trucks"
            style={
                numberOfTrucks > 10
                    ? {
                          gridTemplateColumns: `repeat(${Math.floor(
                              numberOfTrucks / 10
                          )}, 1fr)`,
                      }
                    : {}
            }
        >
            {new Array(+numberOfTrucks).fill(0).map((truck, index) => (
                <div
                    className={`show-trucks__item ${
                        index === activeTruck
                            ? "show-trucks__item_active"
                            : "show-trucks__item_not-active"
                    }`}
                    onMouseDown={() => setActiveTruck(index)}
                >
                    <img src="svgs/truck.svg" alt="truck" />
                    Авто {index + 1}
                </div>
            ))}
        </div>
    );
};

export default ShowTrucks;
