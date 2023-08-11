import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import firebaseApp from '../../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';



export const AuthContext = createContext(null);
const auth = getAuth(firebaseApp);
const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const addNameAndPhoto = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                axios.post('https://bistro-boss-server-seven-eta.vercel.app/jwt', {
                    email: user.email
                })
                    .then(data => {
                        // console.log(data);
                        localStorage.setItem('access-token', data.data.token);
                        setLoading(false)
                    })
            }
            else{
                localStorage.removeItem('access-token')
            }

           
        })
        return () => {
            unsubscribe();
        }
    }, []);
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        addNameAndPhoto,
        login,
        logOut,
        loginWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;