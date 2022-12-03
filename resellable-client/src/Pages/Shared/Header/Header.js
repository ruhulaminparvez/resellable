import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../Assets/logos/icon.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from 'react-hot-toast';

const Header = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.form?.pathname || "/";

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                toast("You have logged out");
                navigate('/login', { state: { from } });
            })
            .catch((error) => {
                toast(error.message);
            });
    };

    const menuItems = (
      <React.Fragment>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
      </React.Fragment>
    );

  return (
    <div className="navbar bg-base-100 lg:px-56">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="normal-case text-xl font-bold flex justify-center items-center gap-2">
            <img className="w-10" src={logo} alt="" />
            Resellable
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {menuItems}
        </ul>
      </div>
      <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <div className="navbar-end">
        {
          user?.email ? 
          (
            <React.Fragment>
              <Link to='/dashboard' className="btn text-white border-0 hover:bg-orange-400 hover:text-white mr-2">Dashboard</Link>
              <button onClick={handleLogOut} className="btn text-white border-0 hover:bg-orange-400 hover:text-white">LogOut</button> 
            </React.Fragment>
          )
          : 
          <Link to='/login' className="btn text-white border-0 hover:bg-orange-400 hover:text-white">Login</Link>
        }
      </div>
    </div>
  );
};

export default Header;
