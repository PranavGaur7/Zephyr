import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import sec3 from "../../assets/images/sec3-bg.png"
import logo from "../../assets/images/logo.png"
import floatImg from "../../assets/images/float.png"
import complete from "../../assets/anim/complete.gif"
import strip from "../../assets/images/strip.png"
import { z } from "zod"
import { motion } from 'framer-motion';
const UserSchema = z.object({
    username: z.string().min(1),  // Username is a required non-empty string
    password: z.string(),  // Password is required with a minimum length of 6
});
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components'
import { toast } from 'sonner'
import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTAION, LOGIN_USER_MUTAION } from '../../queries/mutations/user.mutation'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, state } from '../../redux/userDetails/userSlice'
import { useCookies } from 'react-cookie'
type formData = z.infer<typeof UserSchema>
const Login = () => {
    const logged = useSelector((store: { user: state }) => store.user.logged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    const [userDetails, setUserDetails] = useState();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<formData>({
        resolver: zodResolver(UserSchema)
    })
    const [loginUser, { data: userData, loading: loggingUser, error }] = useMutation(LOGIN_USER_MUTAION, {
        onCompleted: async () => {
            toast.success("Logged in")
        }
    })
    useEffect(()=>{
        if(logged) navigate('/');
    },[logged])
    
    useEffect(() => {
        console.log(userData);
        if (userData) {

            dispatch((setLogin({
                logged: true,
                userDetails: userData.login.user
            })))
            setCookie("auth", userData.login.token, {
                maxAge: 172800,
            })
            navigate('/')
        }

    }, [userData])
    const submitHandle: SubmitHandler<formData> = async (data) => {
        try {
            const { password, username } = data;
            const user = await loginUser({ variables: { input: { password, username } } })

        }
        catch (err: any) {
            let er = err?.message;
            switch (er) {
                case "USER_NOT_FOUND":
                    setError("username", {
                        message: "username not found"
                    })
                    break;
                case "INCORRECT_PASSWORD":
                    setError("password", {
                        message: "incorrect password"
                    })
                    break;
                default:
                    break;
            }
            console.log(err);
        }
    }
    useEffect(() => {

    })
    return (
        <Container >
            <form className="font-customFont w-screen h-screen flex items-center justify-end bg-no-repeat bg-center bg-cover bg-local overflow-hidden" onSubmit={handleSubmit(submitHandle)}>
                <div className=" h-full w-1/5 lg:w-1/3  pt-5 ">
                    <img src={logo} alt="" className='h-0 lg:h-80 fixed  lg:left-2' />

                </div>
                <motion.div className="h-full w-4/5 lg:w-3/5 relative  float-end bg-white rounded-s-[80px] ps-10 sm:ps-24 md:ps-40 pt-24 sm:pt-36 flex flex-col pe-16 md:pe-36 "
                    initial={{
                        x: "100vw"
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                >
                    <img src={floatImg} alt="" className='absolute h-0 sm:-left-60 sm:h-1/2 md:h-3/4 md:-left-96 bottom-0 ' />
                    <motion.h1 className='text-4xl font-bold text-secondary-color mb-16 text-custom-purple-dark'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    >Login</motion.h1>
                    <motion.input type="text" {...register("username")} placeholder='Your Name' className={`border-b-4 pb-1  text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700 ${errors.username ? "mb-0 border-red-300" : "mb-6"}`}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    />
                    {errors.username && <span className='mb-5 text-xs text-red-500'>*{errors.username.message}</span>}
                    <motion.input type="password" {...register("password")} placeholder='Password' className={`border-b-4  pb-1  text-md outline-none focus:border-secondary-color transition-all ease-in-out duration-700 ${errors.password ? "mb-0 border-red-300" : "mb-6"}`}
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    />
                    {errors.password && <span className='mb-5 text-xs text-red-500'>*{errors.password.message}</span>}
                    <motion.div className='w-48'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    >
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                if (credentialResponse?.credential) {
                                    const decoded = jwtDecode(credentialResponse.credential);
                                    console.log(decoded);
                                } else {
                                    console.log('Credential is undefined');
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </motion.div>
                    <motion.button type="submit" disabled={isSubmitting} className=" group relative h-14 w-48 sm:w-60 mt-8 overflow-hidden rounded-md bg-custom-purple-dark  text-lg sm:text-xl shadow font-normal"

                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}

                    >
                        <div className="absolute inset-0 w-0 bg-white transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-white group-hover:text-custom-purple-dark flex items-center justify-center">
                            {isSubmitting || loggingUser ? <img className='w-11' src={complete} alt="" /> : "Login"}</span>
                    </motion.button>
                    <motion.span
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.5
                        }}
                    ><Link to={'/signup'} className="text-blue-600 hover:text-blue-500 hover:underline text-sm mt-1 ms-2">Don't have an Account?</Link></motion.span>
                </motion.div>
            </form>
        </Container>
    )
}
const Container = styled.div`
  
    background-image: url(${sec3});
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
`
export default Login