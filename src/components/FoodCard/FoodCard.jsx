import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCarts from "../../hooks/useCarts";


const FoodCard = ({ item }) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {image, name, recipe, price, _id} = item;
    const [,refetch] = useCarts()


    const handleAddToCart =()=>{
        
        const cartItem = {foodId: _id, name, image, recipe, price, email:user?.email}
        if(user ){
            fetch('https://bistro-boss-server-seven-eta.vercel.app/carts', {
                method: "POST",
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.insertedId){
                    refetch() 
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
        else{
            Swal.fire({
                title: 'Login first',
                text: "For adding food you have to login",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login',{state:{ from: location }})
                }
              })
        }
    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="">
                <img src={image} alt={name}/>
            </figure>
            <p className="absolute right-0 mr-4 mt-4 py-4 px-8 bg-slate-800 text-white">${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={()=>handleAddToCart()} className=" py-3 px-5 bg-slate-100 border-b-2 border-[#bb8506]  text-slate-800 rounded-lg">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;