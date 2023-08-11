import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Allusers = () => {
    const [axiosSecure] = useAxiosSecure()
    const {data:users=[], refetch} = useQuery(['users'], async()=>{
        const res = await axiosSecure.get('/users/');
        return res.data;
    })

    const handleCreateAdmin = user =>{
        fetch(`https://bistro-boss-server-seven-eta.vercel.app/users/admin/${user._id}`,{
            method:'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                refetch();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Congratulations!! Now, ${user.name} is an admin.`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleRemoveCart = ()=>{

    }
    return (
        <div>
            <div>
                <div className="flex justify-between items-center uppercase font-bold my-4">
                    <h4>total users: {users.length}</h4>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="">
                            <tr className=" uppercase ">
                                <th>#</th>
                                <th>user name</th>
                                <th>email</th>
                                <th>role</th>
                                <th>remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,index)=> <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td className="">${user.email}</td>
                                    <td >
                                        { user?.role === 'admin'?
                                        <>
                                        <button onClick={()=>handleRemoveCart(user)} className="bg-orange-600 text-white py-3 px-5 rounded-lg"><FaUserShield/></button>
                                        
                                        </>
                                        :<>
                                        <button onClick={()=>handleCreateAdmin(user)} className="bg-orange-600 text-white py-3 px-5 rounded-lg" ><FaUser/></button>
                                        
                                        </>

                                        }
                                    </td>
                                    <th>
                                        <button onClick={()=>handleRemoveCart(user)} className="bg-red-600 text-white py-3 px-5 rounded-lg"><FaTrashAlt/></button>
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

export default Allusers;