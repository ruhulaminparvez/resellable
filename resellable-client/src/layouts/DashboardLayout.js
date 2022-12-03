import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';
import Header from './../Pages/Shared/Header/Header';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    
    return (
        <div>
            <Header />
            <div className="drawer drawer-mobile lg:px-56 bg-base-200">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-6">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side bg-white">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isBuyer && <li><Link to="/dashboard/myorders" className='font-bold'>My Orders</Link></li>
                        }
                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/allusers" className='font-bold'>All users</Link></li>
                                <li><Link to="/dashboard/allsellers" className='font-bold'>All Sellers</Link></li>
                                <li><Link to="/dashboard/allbuyers" className='font-bold'>All Buyers</Link></li>
                            </>
                        }   
                        {
                            isSeller && <>
                                <li><Link to="/dashboard/myproducts" className='font-bold'>My Products</Link></li>
                                <li><Link to="/dashboard/addproduct" className='font-bold'>Add A Product</Link></li>
                                <li><Link to="/dashboard/mybuyers" className='font-bold'>My Buyers</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;