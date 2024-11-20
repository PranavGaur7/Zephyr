import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { state } from '../redux/userDetails/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const logged = useSelector((store: { user: state }) => store.user.logged);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    
    useEffect(()=>{
        console.log(logged);
        
        if(!logged){
            navigate('/login');
        }
    },[logged]);

    return (
        <div>Home</div>
    )
}

export default Home