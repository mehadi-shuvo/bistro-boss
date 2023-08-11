import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCarts = () => {
  const { user } = useContext(AuthContext);
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();


  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    enabled:!!user?.email && !!localStorage.getItem("access-token"),
    // queryFn: async ()=>{
    //     const response = await fetch(`https://bistro-boss-server-seven-eta.vercel.app/carts?email=${user?.email}`, {headers:{
    //       authorization: `bearer ${token}`
    //     }})

    //     return response.json()
    // },
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`)
      // console.log(res);
      return res.data;
    },
  });
  return [cart, refetch]
}

export default useCarts;