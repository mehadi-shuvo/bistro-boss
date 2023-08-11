import { useContext, useEffect, useState } from 'react';
import img from '../../assets/others/Illustration.svg'
import './Login.css';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
const Login = () => {
    const { login } = useContext(AuthContext)
    const [captcha, setCaptcha] = useState('')
    const [disable, setDisable] = useState(true)
    let location = useLocation();
    let navigate = useNavigate();


    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    // console.log(captcha);
    const CheckCaptchaHandler = () => {
        if (validateCaptcha(captcha)) {
            setDisable(false)
        }
    }



    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Login successfully!!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='wood-bg min-h-screen grid items-center'>
            <div className='wood-bg flex flex-col md:flex-row w-4/5 mx-auto shadow-xl p-10 gap-5'>
                <div className='md:w-1/2'>
                    <img src={img} alt="" />
                </div>
                <div className='md:w-1/2'>
                    <form onSubmit={handleLogin} >
                        <h4 className='font-bold text-3xl mb-5'>Login</h4>
                        <label className='text-[#444] text-xl font-semibold block mb-4'>Email</label>
                        <input className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your email' type="email" name="email" />
                        <label className='text-[#444] text-xl font-semibold block mb-4 mt-4'>Password</label>
                        <input className='border border-[#d0d0d0] rounded-lg py-4 pl-7 w-4/5' placeholder='Your password' type="password" name="password" />

                        <input disabled={false} className='btn btn-success block mt-5 w-4/5' type="submit" value="Login" />
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

export default Login;