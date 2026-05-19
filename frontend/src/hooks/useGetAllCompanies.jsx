import { setCompanies } from '@/redux/companySlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const COMPANY_API_END_POINT = import.meta.env.VITE_USER_COMPANY_END_POINT

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [dispatch, COMPANY_API_END_POINT]); // ⚡ Make sure this dependency array is updated
}

export default useGetAllCompanies;