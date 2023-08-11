import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imgKey = import.meta.env.VITE_IMG_KEY
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm();
    const imgHostingURL = `https://api.imgbb.com/1/upload?key=${imgKey}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        console.log(data);



        fetch(imgHostingURL, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const imgURL = imgData.data.display_url;
                    const { name, category, price, recipe } = data
                    const newItem = { name, category, price: parseFloat(price), recipe, image: imgURL };
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: 'Item added successfully!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })


    };

    return (
        <div>
            <SectionTitle title={'add an item'} subTitle="What's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 p-10 bg-slate-200 rounded-lg m-10">
                    <div>
                        <label>Recipe name*</label><br />
                        <input type="text"
                            placeholder="First name" {...register("name", { required: true, maxLength: 120 })}
                            className="input input-bordered input-error w-full" />
                    </div>
                    <div className="w-full flex gap-8">
                        <div className="w-full">
                            <label>Category*</label><br />
                            <select {...register("category", { required: true })}
                                className="select select-error w-full">
                                <option value="pizza">pizza</option>
                                <option value="desert">desert</option>
                                <option value="soup">soup</option>
                                <option value="drinks">drinks</option>
                                <option value="salad">salad</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label>Price*</label><br />
                            <input type="number"
                                placeholder="price" {...register("price", { required: true, maxLength: 120 })}
                                className="input input-bordered input-error w-full" />
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Details*</label><br />
                        <textarea type="number" placeholder="food details"
                            {...register("recipe", { required: true, maxLength: 120 })}
                            className="textarea textarea-error w-full" />
                    </div>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-1/3" />

                    <input className="btn btn-primary btn-sm" type="submit" value="Add an Item" />
                </form>
            </div>
        </div>

    );
};

export default AddItem;