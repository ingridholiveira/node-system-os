import React, { Component, useState, useEffect } from 'react';



class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: []
    }
  }

  render() {
    return (
      <header>
            <div class="container py-3">
                <div class="row justify-content-center">
                    <div class="col align-self-center">
                        <nav class="navbar navbar-expand-lg navbar navbar-dark bg-primary">
                            <a class="navbar-brand ms-2 h1" href="/">PredialX</a>
                            <div class="collapse navbar-collapse" id="navbarNav">
                              <ul class="navbar-nav nav justify-content-end">
                                <li class="nav-item active">
                                  <a class="nav-link" href="/clients">Clientes</a>
                                </li>
                                <li class="nav-item active">
                                  <a class="nav-link" href="/contributors">Colaboradores</a>
                                </li>
                                <li class="nav-item active">
                                  <a class="nav-link" href="orders">Criação de O.S.</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="orderslist">Lista de O.S.</a>
                                </li>
                              </ul>
                            </div>
                          </nav>
                    </div>
                </div>
            </div>
        </header>
    );
  }
}

export default Menu;