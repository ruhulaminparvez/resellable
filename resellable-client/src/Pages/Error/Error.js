import React from 'react';
import error from '../../Assets/error/404.svg'

const Error = () => {
    return (
        <div className='lg:px-56 bg-base-200 py-6 flex justify-center items-center'>
            <img className='w-1/2' src={error} alt="" />
        </div>
    );
};

export default Error;