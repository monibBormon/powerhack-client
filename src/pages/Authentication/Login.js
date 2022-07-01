import React from 'react';
import { useForm } from "react-hook-form";
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assests/img/login.webp'
import { LoginUser } from '../../ApiRequests/AuthenticationApi';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const onSubmit = data =>{
        if(data.EmailAddress===""){
            return cogoToast.error("Enter EmailAddress")
        }else if(data.Password===""){
            return cogoToast.error("Enter Password")
        }else{
            LoginUser(data)
            .then(result=>{
                if(result === false){
                    return cogoToast.error("User Not Found.")
                }
                if(result.data.status === "success"){
                    // console.log(result.data.data);
                    localStorage.setItem("user",JSON.stringify(result.data.data))
                    localStorage.setItem('token',result.data.token)
                    reset()
                    navigate('/')
                    window.location.reload()
                    cogoToast.success("Login Successfull.")
                }
            })
        }
    }


    return (
        <div className='container mx-auto px-5 lg:px-0'>
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                <div className="login-img mt-5 hidden lg:block">
                    <img src={loginImg} alt="login" />
                </div>
                <div className="reg-form mt-5 lg:mt-0">
                 <h2 className='text-4xl mb-5'>Please Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Email' type='email' {...register("EmailAddress")} /><br/>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Password' {...register("Password")} /><br/><br/>
                        
                        <input className='bg-violet-500 text-white px-8 py-2 font-semibold rounded-md cursor-pointer'  type="submit" value={'Login'} />
                    </form>
                    <p className='mt-5'>Don't Have an Account? <Link className='underline font-medium' to={'/registration'}>Register Here.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;