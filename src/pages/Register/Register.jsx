import { useContext, useEffect, useState } from 'react';
import img from '../../assets/others/Illustration.svg';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Register = () => {
    const { createUser, addNameAndPhoto } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [captcha, setCaptcha] = useState('')
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const CheckCaptchaHandler = () => {
        if (validateCaptcha(captcha)) {
            setDisable(false)
        }
    }

    const onSubmit = data => {
        //console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                //console.log(user)
                addNameAndPhoto(data.name, data.photo)
                    .then(() => {
                        const user = { email: data.email, name: data.name, photo: data.photo }
                        fetch('https://bistro-boss-server-seven-eta.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.acknowledged) {
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }

                            })

                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className='wood-bg min-h-screen grid items-center'>
            <div className='wood-bg flex flex-col md:flex-row w-4/5 mx-auto shadow-xl p-10 gap-5'>
                <div className='md:w-1/2'>
                    <img src={img} alt="" />
                </div>
                <div className='md:w-1/2'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <h4 className='font-bold text-3xl mb-5'>Register</h4>
                        <label className='text-[#444] text-xl font-semibold block mb-4'>Name</label>
                        <input {...register("name")} className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your name' type="text" />
                        <label className='text-[#444] text-xl font-semibold block mb-4'>Photo</label>
                        <input {...register("photo")} className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your photoURL' type="text" />
                        <label className='text-[#444] text-xl font-semibold block mb-4'>Email</label>
                        <input {...register("email",
                            {
                                required: true
                            })}
                            className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your email' type="email" name="email" />
                        {errors.email && <span className='text-red-500 block'>Email is required</span>}
                        <label className='text-[#444] text-xl font-semibold block mb-4 mt-4'>Password</label>
                        <input {...register("password",
                            {
                                required: true,
                                maxLength: 20,
                                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                            })}
                            className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your password' type="password" name="password" />
                        {errors.password?.type === 'required' && <span className='text-red-500 block'>Password is required</span>}
                        {errors.password?.type === 'pattern' && <span className='text-red-500 block'>Password must have one capital and small letter and a disit</span>}
                        <input disabled={disable} className='btn btn-success block mt-5 w-4/5' type="submit" value="Login" />
                    </form>
                    <div className='my-3'>
                        <LoadCanvasTemplate />
                    </div>
                    <input onChange={(e) => setCaptcha(e.target.value)} className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-3/5' placeholder='Type here' type="text" />
                    <button onClick={CheckCaptchaHandler} className=' ml-6 btn btn-primary'>check</button>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;