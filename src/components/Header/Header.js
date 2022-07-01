import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [amount,setAmount] = useState(0)
    const handleLogOut=()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.reload()
        navigate("/login")
    }
    useEffect(()=>{
        function getAmount(){
            const url = "https://bill-list.herokuapp.com/api/bill-amount"
            const headers={
                "token":`${localStorage.getItem("token")}`
            }
            axios.get(url,{
                headers:headers
            }).then(res=>{
                if(res.status === 200){
                    setAmount(res?.data?.data[0])
                    // localStorage.setItem("amount",amount);
                }
            })
        }

        getAmount()

    },[amount])

    return (
        <div className='py-4 shadow-md px-5 lg:px-0'>
            <div className='container mx-auto'>
                <div className="grid grid-cols-2 items-center gap-4">
                    <div className="logo">
                        <Link to="/"><h4 className='text-2xl font-semibold'>PowerHack</h4></Link>
                    </div>
                    <div className="header-right text-right">
                        
                        {user ? <div className='flex justify-end items-center space-x-4'>
                                    <h4 className='text-xl'>Total Paid: <span className='font-semibold'>{amount ? parseInt(amount?.total) : 0}</span></h4>
                                    <div className='space-x-2'>
                                        <span>{user.FirstName}</span>
                                        <button className='bg-violet-500 text-white px-2 rounded-full font-semibold' onClick={handleLogOut}>LogOut</button>
                                    </div>    
                                </div> :
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/registration">Register</Link>
                            </div>}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;