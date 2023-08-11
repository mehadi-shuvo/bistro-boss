import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import MenuPage from "../pages/MenuPage/MenuPage";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Secrete from "../Secrate/Secrate";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layouts/DashBoard";
import MyCart from "../pages/DashBoard/MyCart/MyCart";
import Allusers from "../pages/DashBoard/AllUsers/AllUsers";
import AddItem from "../pages/DashBoard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/DashBoard/ManageItems/ManageItems";
import Payment from "../pages/DashBoard/Payment/Payment";
import UserHome from "../pages/DashBoard/UserHome/UserHome";
import AdminHome from "../pages/DashBoard/AdminHome/AdminHome";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'menu',
          element: <MenuPage></MenuPage>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'secrete',
          element: <PrivateRoute><Secrete></Secrete></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children:[
        {
          path: 'user-home',
          element: <UserHome></UserHome>
        },
        {
          path: 'mycart',
          element: <MyCart></MyCart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        //admin
        {
          path: 'admin-home',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'allusers',
          element: <AdminRoute><Allusers></Allusers></AdminRoute>
        },
        {
          path: 'addItem',
          element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        }

      ]
    }
  ]);