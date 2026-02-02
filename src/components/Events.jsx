import React from "react";
import ProductionEvents from "./ProductionEvents";
import GeneralEvents from "./GeneralEvents";

const Events = () => {
  
    return (
        <div>
            {/* Saptham Annual Productions */}
            <ProductionEvents />

            {/* Other Events */}
            <GeneralEvents  />
        </div>
    );
};

export default Events;
