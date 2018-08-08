import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="spinner App">
            <RingLoader color={'#1eaedb'} size={120} margin={'3px'}/>
        </div>
    );
};

export default Spinner;
