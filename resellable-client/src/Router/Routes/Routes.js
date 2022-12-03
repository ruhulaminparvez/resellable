import { createBrowserRouter } from "react-router-dom";
import Categories from "../../Pages/Home/Categories/Categories";
import Main from "./../../layouts/Main";
import Home from "./../../Pages/Home/Home/Home";
import Blog from "./../../Pages/Blog/Blog";
import Contact from "./../../Pages/Contact/Contact";
import Login from "./../../Pages/Login/Login";
import SignUp from "./../../Pages/SignUp/SignUp";
import Error from "../../Pages/Error/Error";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import DashboardLayout from './../../layouts/DashboardLayout';
import MyOrders from './../../Pages/Dashboard/MyOrders/MyOrders';
import AllUsers from './../../Pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from './../AdminRoute/AdminRoute';
import MyProduct from './../../Pages/Dashboard/MyProduct/MyProduct';
import AddProduct from './../../Pages/Dashboard/AddProduct/AddProduct';
import SellerRoute from '../SellerRoute/SellerRoute';
import BuyerRoute from './../BuyerRoute/BuyerRoute';
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import AllSellers from './../../Pages/Dashboard/AllSellers/AllSellers';
import AllBuyers from './../../Pages/Dashboard/AllBuyers/AllBuyers';
import Products from "../../Pages/Home/Products/Products";
import MyBuyers from './../../Pages/Dashboard/MyBuyers/MyBuyers';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      { 
        path: "products/category/:category",  
        element: <PrivateRoute><Products></Products></PrivateRoute>,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/myorders",
        element: <BuyerRoute><MyOrders /></BuyerRoute>,
      },
      {
        path: "/dashboard/addproduct",
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>,
      },
      {
        path: "/dashboard/myproducts",
        element: <SellerRoute><MyProduct></MyProduct></SellerRoute>,
      },
      {
        path: "/dashboard/mybuyers",
        element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>,

      },
      {
        path: "/dashboard/allusers",
        element: <AdminRoute><AllUsers /></AdminRoute>,
      },
      {
        path: "/dashboard/allsellers",
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>,
      },
      {
        path: "/dashboard/allbuyers",
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>,
      }

    ],
  },
]);

export default router;
