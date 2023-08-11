import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaBook, FaCalendarAlt, FaCalendarCheck, FaComments, FaEnvelope, FaHome, FaShoppingBag, FaShoppingCart, FaTasks, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
    // const isAdmin = true;
    const [isAdmin] = useAdmin()
    // console.log(isAdmin);
    
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content m-14">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side bg-[#d1a054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 uppercase text-[#151515]">
                    <h4 className="text-2xl font-black ml-5">Bistro boss</h4>
                    <p className="text-lg font-bold ml-5">restaurant</p>
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/home'><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItem'><FaUtensils/> Add Item</NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'><FaTasks /> manage items</NavLink></li>
                                <li><NavLink to='/review'><FaBook /> manage bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allusers'><FaUsers /> All users</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to='/home'><FaHome /> User Home</NavLink></li>
                                <li><NavLink to='/reservation'><FaCalendarAlt /> reservation</NavLink></li>
                                <li><NavLink to='/history'><FaWallet /> Payments history</NavLink></li>
                                <li><NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart</NavLink></li>
                                <li><NavLink to='/review'><FaComments /> Add review</NavLink></li>
                                <li><NavLink to='/booking'><FaCalendarCheck /> My booking</NavLink></li>
                            </>
                    }


                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome /> Home</NavLink></li>
                    <li><NavLink to='/menu'><FaBars /> menu</NavLink></li>
                    <li><NavLink to='/shop'><FaShoppingBag /> shop</NavLink></li>
                    <li><NavLink to='/contact'><FaEnvelope /> contact</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoard;