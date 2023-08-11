import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext)
    let location = useLocation();
    let navigate = useNavigate();


    let from = location.state?.from?.pathname || "/";


    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const data = result.user;
                console.log(data);
                const user = { email: data.email, name: data.displayName, photo: data.photoURL }
                fetch('https://bistro-boss-server-seven-eta.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });

                    })
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="divider divider-horizontal"></div>
            <div className="text-center my-5">
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;