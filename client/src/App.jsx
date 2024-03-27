import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateUser from './pages/User/CreateUser/CreateUser';
import UserList from './pages/User/UserList/UserList';
import Layout from './layout/Layout';
import { UserContextProvider } from './context/UserContext';
import LoginPage from './pages/User/LoginPage/LoginPage';
import EmailValidation from './pages/EmailValidation/EmailValidation';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/email-validation' element={<EmailValidation />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/user/list' element={<UserList />} />
            <Route path='/user/create' element={<CreateUser />} />
            <Route path='/user/login' element={<LoginPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
