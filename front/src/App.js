import React from 'react';
import RoutesOs from "./routes";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; 
import Menu from './components/Menu';
import Login from './components/Login';
import useToken from './components/useToken';

export default function App() {
    const { token, setToken } = useToken();
    if(token===null) {
        return <Login setToken={setToken} />
    }
   return (
       <section>
            <Menu />
            <RoutesOs/>
       </section>
   );
}