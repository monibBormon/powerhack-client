import React, {useEffect, useState } from 'react';
import {FaTrash,FaEdit} from 'react-icons/fa'
import { DeleteBill } from '../../ApiRequests/BillApi';
import Swal from 'sweetalert2'
import cogoToast from 'cogo-toast';
import ReactPaginate from 'react-paginate';
import UpdateFormModal from './UpdateFormModal';
import BillFormModal from './BillFormModal';

const BillTable = ({bills,setLoading,setBills, filterProduct,setFilterProduct}) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    // That's all for pagination 
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filterProduct?.sort((a,b)=>a._id>b._id ? -1: 1)?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filterProduct?.length / itemsPerPage));
      }, [itemOffset, itemsPerPage, filterProduct]);

      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filterProduct?.length;
        setItemOffset(newOffset);
      };

    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteBill(id)
                .then(result=>{
                    if(result === true){
                        setFilterProduct(prevTodo=>prevTodo.filter(item=>(item._id !== id)))
                        cogoToast.success('Todo Delete Success.')
                    }
                })
            }
          })
        
    }

    // Edit 
    const handleEdit=(id)=>{
        localStorage.setItem("editId",id)
        setShowModal2(true)
    }

    // Search 
    const handleSearch=(e)=>{
        const text = e.target.value;
        const matchedBill = bills?.filter(bill=>bill.FullName.toLowerCase().includes(text.toLowerCase()))
        setFilterProduct(matchedBill)
        setCurrentItems(matchedBill)
    }
    return (
        <div>
            <div className='container mx-auto'>
            <div className="grid grid-cols-2 gap-4">
                <div className="search-bar flex items-center space-x-4">
                    <h4 className='text-xl'>Billings</h4>
                    <input onChange={(e)=>handleSearch(e)} className='border-[2px] h-10 pl-4 rounded border-gray-700 focus:outline-gray-500 ' type="text" placeholder='Search by Name' />
                </div>
                <div className="bill-right text-right">
                    <button onClick={() => setShowModal(true)} className='px-8 py-2 bg-gray-700 text-white font-semibold rounded'>Add New Bill</button>
                </div>
            </div>
            <BillFormModal setLoading={setLoading} setPageCount={setPageCount} showModal={showModal} setShowModal={setShowModal} setCurrentItems={setCurrentItems} setFilterProduct={setFilterProduct} setBills={setBills} />
        </div>
        <div className='container mx-auto py-10'>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Billing Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Full Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Paid Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    filterProduct?.length >0 && <tbody className="bg-white divide-y divide-gray-200">
                                
                                    {
                                        currentItems?.sort((a,b)=>a._id>b._id ? -1: 1)?.map((item,index)=>{
                                            return <tr key={item._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        <div className="text-sm font-medium text-gray-900">{item._id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">{item.FullName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">{item.Email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                   {item.Phone}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                   {item.Amount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 text-gray-500">
                                                 <FaEdit onClick={() =>handleEdit(item._id)} className='text-violet-500 cursor-pointer text-base inline-block' />
                                                 <FaTrash onClick={()=>handleDelete(item._id)} className='text-red-500 cursor-pointer text-base inline-block'/>
                                            </td>
                                        </tr>
                                        })
                                    }
                            </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
         </div>
         <UpdateFormModal  showModal2={showModal2} setShowModal2={setShowModal2} setBills={setBills} setCurrentItems={setCurrentItems} />
         {
            filterProduct?.length === 0 && <div>
                <p className='py-10 text-center text-gray-500 w-full'>No Bills to show !</p>
            </div>
        }
        </div>
        { filterProduct?.length >0 && <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='active'
        />}
        </div>
    );
};

export default BillTable;