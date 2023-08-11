import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    const handleRemoveCart = item => {
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


                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    return (
        <div>
            <SectionTitle title="Manage items" subTitle="Hurry up"></SectionTitle>
            <div>
                <div className="flex justify-between items-center uppercase font-bold my-4">
                    <h4>total items: {menu.length}</h4>
                    <button className="btn bg-[#d1a054] border-none p-3 px-5">pay</button>
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
                                <th>update</th>
                                <th>remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((row, index) => <tr key={row._id}>
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
                                    <td>
                                        <button className="bg-orange-600 text-white py-3 px-5 rounded-lg"><FaEdit /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveCart(row)} className="bg-red-600 text-white py-3 px-5 rounded-lg"><FaTrashAlt /></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;