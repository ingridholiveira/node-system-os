import React from "react";
import { Route, Routes } from "react-router-dom";

import Orders from "./components/Orders";
import Clients from "./components/Clients";
import Contributors from "./components/Contributors";
import Login from "./components/Login";
import OrdersList from "./components/OrdersList";

const RoutesOs = () => {
    console.log('rotas routesjs')
   return(
       <Routes>
           <Route element = {<Orders />}  path="/orders" exact />
           <Route element = {<OrdersList />}  path="/orderslist" exact />
           <Route element = {<Clients />}  path="/clients" />
           <Route element = {<Contributors />}  path="/contributors" />
           <Route element = {<Login />}  path="/" exact />
       </Routes>
   )
}

export default RoutesOs;