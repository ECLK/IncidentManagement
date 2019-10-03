import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const IntlSelect = (props) => {

    const {value, handleChange, name, dataObj } = props;

    return (
        <Select
            value={value}
            onChange={handleChange}
            inputProps={{
                name: name,
                id: name,
            }}
        >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {dataObj.allCodes.map((c, k) => {
                let currEntry = dataObj.byCode[c]
                return <MenuItem value={currEntry.code} key={k}>
                    {currEntry.name}
                </MenuItem>
            })}
        </Select>
    )
};


export default IntlSelect;
