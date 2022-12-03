import React from 'react';
import dashboard from '../../../Assets/dashboard/dashboard.svg';

const Dashboard = () => {
    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>Dashboard</h2>
            <div className='flex justify-center items-center'>
                <img className='w-full' src={dashboard} alt="" />
            </div>
        </div>
    );
};

export default Dashboard;