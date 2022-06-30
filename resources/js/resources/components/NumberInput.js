import React, { useState } from "react";
import utils from "../../utils/Utils";

const NumberInput = ({ className }) => {
    const [value, setValue] = useState(0);

    const addCommas = (num) =>
        num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num) => num?.toString().replace(/[^0-9]/g, "");

    const handleChange = (event) => {
        setValue(field, addCommas(removeNonNumeric(event.target.value)));
    };

    return (
        <input
            type="text"
            value={value}
            onInput={utils.digitInputChange}
            style={{ direction: "ltr", textAlign: "left" }}
            className={{ ...className }}
        />
    );
};

export default NumberInput;
