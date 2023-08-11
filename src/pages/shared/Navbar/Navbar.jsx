import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCarts from "../../../hooks/useCarts";
import useAdmin from "../../../hooks/useAdmin"
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCarts();
    const [isAdmin] = useAdmin();

    const navItems = <>
        <li><Link>Home</Link></li>
        <li><Link>Contact Us</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/salads'>Order Food</Link></li>
        <li><Link to={isAdmin ? '/dashboard/admin-home' : '/dashboard/user-home'}>Dashboard</Link></li>
        <li><Link to='/dashboard/mycart'>
            <button className="btn gap-2">
                <FaShoppingCart />
                <div className="badge">{cart?.length || 0}</div>
            </button>
        </Link></li>
    </>

    const handleLogOut = () => {
        logOut().then(() => {

        })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="navbar bg-black bg-opacity-30 text-white fixed z-20">
                
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {navItems}
                            </ul>
                        </div>
                        <a className="uppercase grid grid-cols-1 justify-center items-center"><span className="text-3xl font-black font-serif">Bistro Boss</span> <span className="text-2xl font-serif font-bold tracking-[4px]">Restaurant</span></a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {user ?
                            <>

                                <button onClick={handleLogOut} className="btn btn-primary">LogOut</button>
                            </>
                            : <Link to='/login' className="btn">Login</Link>}
                    </div>
               
            </div>
        </div>
    );
};

export default Navbar;