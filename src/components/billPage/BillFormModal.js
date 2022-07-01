import React from 'react';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';
import { CreateBill } from '../../ApiRequests/BillApi';

const BillFormModal = ({showModal,setShowModal,setCurrentItems,setFilterProduct,setLoading,setBills}) => {
  const { register, handleSubmit, reset } = useForm();

    const onSubmit = data =>{
      if(data.FullName===""){
          return cogoToast.error("Enter FullName")
        }else if(data.Email===""){
            return cogoToast.error("Enter Email")
        }else if(data.Phone===""){
          return cogoToast.error("Enter Phone Number")
         }else if(data.Amount===""){
          return cogoToast.error("Enter Amount")
        }else{
          setLoading(true)
          CreateBill(data)
          .then(result=>{
            console.log(result);
            if(result === false){
                return cogoToast.error("Something went Wrong!")
            }
            if(result.data.status === "success"){
                cogoToast.success("Bill Create Success")
                setBills(prev=>[...prev,result.data.data])
                setFilterProduct(prev=>[...prev,result.data.data])
                setCurrentItems(prev=>[...prev,result.data.data])
                reset()
                setLoading(false)
                setShowModal(false)
            }
        })
        }
    }


    return (
        <>
          {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-500">
                    Add Bill
                  </h3>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 mx-auto w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input className='border-[2px] border-gray-500 w-[400px] h-10 pl-4 rounded mb-3' type="text" placeholder='Full Name' {...register("FullName")} /> <br />
                  <input className='border-[2px] border-gray-500 w-[400px] h-10 pl-4 rounded mb-3' type="email" placeholder='Email' {...register("Email")} /> <br />
                  <input className='border-[2px] border-gray-500 w-[400px] h-10 pl-4 rounded mb-3' type="number" placeholder='Phone Number' {...register("Phone")} /> <br />
                  <input className='border-[2px] border-gray-500 w-[400px] h-10 pl-4 rounded mb-3' type="number" placeholder='Amount' {...register("Amount")} /> <br />
                  <input className='bg-violet-500 text-white px-8 py-2 font-semibold rounded-md cursor-pointer'  type="submit" value={'Add'} />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}  
        </>
    );
};

export default BillFormModal;