import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="spinner">
            <RingLoader color={'#1eaedb'} size={30} margin={'3px'}/>
        </div>
    );
};

export default Spinner;
