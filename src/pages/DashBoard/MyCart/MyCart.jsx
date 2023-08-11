import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCarts from "../../../hooks/useCarts";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCarts()
    const price = cart.reduce((sum, item) => item.price + sum, 0)

    const handleRemoveCart = (item)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`https://bistro-boss-server-seven-eta.vercel.app/carts/${item._id}`,{
                method: 'DELETE'
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.deletedCount>0){
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'

                    )
                }
              })
            }
          })
    }
    return (
        <div>
            <SectionTitle subTitle={'My Cart'} title={"Wanna Add More?"}></SectionTitle>
            <div>
                <div className="flex justify-between items-center uppercase font-bold my-4">
                    <h4>total orders: {cart.length}</h4>
                    <h3>total price: ${price}</h3>
                    <Link to='/dashboard/payment'><button className="btn bg-[#d1a054] border-none p-3 px-5">pay</button></Link>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="">
                            <tr className=" uppercase ">
                                <th>#</th>
                                <th>item image</th>
                                <th>item name</th>
                                <th>price</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((row,index)=> <tr key={row._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12">
                                                    <img src={row.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {row.name}
                                    </td>
                                    <td className="">${row.price}</td>
                                    <th>
                                        <button onClick={()=>handleRemoveCart(row)} className="bg-red-600 text-white py-3 px-5 rounded-lg"><FaTrashAlt/></button>
                                    </th>
                                </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;