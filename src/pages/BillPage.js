import React, { useEffect, useState } from 'react';
import { fetchBills } from '../ApiRequests/BillApi';
import BillTable from '../components/billPage/BillTable';
import loader from '../assests/img/loader.svg'

const BillPage = () => {
    const [bills, setBills] = useState([])
    const [filterProduct,setFilterProduct] = useState([])
    const [loading,setLoading] = useState(false)
    // const token = localStorage.getItem("token")

    useEffect(()=>{
        setLoading(true)
        fetchBills()
        .then(res=>{
            setFilterProduct(res)
            setBills(res);
            setLoading(false)
        })
    },[])

    if(loading){
        return <img className='mx-auto absolute left-0 right-0 top-1/3' src={loader} alt="loader" />
    }
    
    return (
        <div className='py-10 px-10'>
            {/* <BillSearchBar bills={bills} setBills={setBills} /> */}
            <BillTable bills={bills} filterProduct={filterProduct} setFilterProduct={setFilterProduct} setBills={setBills} setLoading={setLoading} />
        </div>
    );
};

export default BillPage;