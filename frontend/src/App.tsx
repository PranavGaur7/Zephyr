import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_QUERY } from './queries/queries/user.queries';
import { setLogin } from './redux/userDetails/userSlice';
import Home from './components/Home';
import Loader from './components/assets/Loader';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const dispatch = useDispatch();
  
  const { data: userData, loading: gettingUser, error } = useQuery(GET_USER_QUERY, {
    skip: !cookies.auth,
    onError:()=>{
      console.log(error);
    },
    onCompleted:()=>{
        dispatch((setLogin({
          logged:true,
          userDetails:userData
        })))
    }
  });
  if(gettingUser) return  <Loader/>;
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App