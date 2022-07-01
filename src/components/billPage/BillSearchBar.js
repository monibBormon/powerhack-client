import React, { useState } from 'react';
import BillFormModal from './BillFormModal';

const BillSearchBar = ({setBills}) => {
    const [showModal, setShowModal] = React.useState(false);
    const [searchText,setSearchText] = useState("")

    return (
        <div className='container mx-auto'>
            <div className="grid grid-cols-2 gap-4">
                <div className="search-bar flex items-center space-x-4">
                    <h4 className='text-xl'>Billings</h4>
                    <input onChange={(e)=>localStorage.setItem("search",e.target.value)} className='border-[2px] h-10 pl-4 rounded border-gray-700 focus:outline-gray-500 ' type="text" placeholder='Search' />
                </div>
                <div className="bill-right text-right">
                    <button onClick={() => setShowModal(true)} className='px-8 py-2 bg-gray-700 text-white font-semibold rounded'>Add New Bill</button>
                </div>
            </div>
            <BillFormModal showModal={showModal} setShowModal={setShowModal} setBills={setBills} />
        </div>
    );
};

export default BillSearchBar;