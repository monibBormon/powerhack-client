import React from 'react';
import { useForm } from "react-hook-form";
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assests/img/login.webp'
import { RegisterUser } from '../../ApiRequests/AuthenticationApi';

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const onSubmit = data =>{
        if(data.FirstName === ""){
            return cogoToast.error("Enter First Name")
        }else if(data.LastName===""){
            return cogoToast.error("Enter Last Name")
        }else if(data.EmailAddress===""){
            return cogoToast.error("Enter EmailAddress")
        }else if(data.MobileNumber===""){
            return cogoToast.error("Enter MobileNumber")
        }else if(data.Password===""){
            return cogoToast.error("Enter Password")
        }else{
            RegisterUser(data)
            .then(result=>{
                if(result === true){
                    cogoToast.success("Registration Success")
                    navigate("/login")
                    reset()
                }else{
                    cogoToast.error("Request Fail try again")
                }
            })
        }
        // console.log(data)
    }


    return (
        <div className='container mx-auto px-5 lg:px-0'>
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                <div className="login-img mt-5 hidden lg:block">
                    <img src={loginImg} alt="login" />
                </div>
                <div className="reg-form mt-5 lg:mt-0">
                 <h2 className='text-4xl mb-5'>Please Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter First Name' {...register("FirstName")} /> <br/>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Last Name' {...register("LastName")} /><br/>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Email' type='email' {...register("EmailAddress")} /><br/>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Phone' {...register("MobileNumber")} /><br/>
                        <input className='border-2 w-full mb-3 h-10 pl-3' placeholder='Enter Password' {...register("Password")} /><br/><br/>
                        
                        <input className='bg-violet-500 text-white px-8 py-2 font-semibold rounded-md cursor-pointer'  type="submit" value={'Sign Up'} />
                    </form>
                    <p className='mt-5'>Already Have an Account? <Link className='underline font-medium' to={'/login'}>Login Here.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;