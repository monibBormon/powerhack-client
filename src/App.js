import React, { Fragment } from 'react';
import {Routes,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Authentication/Login';
import PrivateRoute from './pages/Authentication/PrivateRoute';
import Register from './pages/Authentication/Register';
import BillPage from './pages/BillPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Fragment>
      <Header/>
        <Routes>
          <Route path='/' element={<PrivateRoute><BillPage/></PrivateRoute>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Register/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
    </Fragment>
  );
};

export default App;