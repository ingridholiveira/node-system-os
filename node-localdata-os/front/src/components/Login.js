import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials) {
  const apiUrl = 'http://localhost:3001/contributor/login';
  const req = {login:credentials.username, password:credentials.password};
  try{
  const resp = await axios.post(apiUrl, req);
  return resp.data[0].id;
  }catch(err){ alert("login ou senha inválidos");}
  
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

    return (
      <div>
        <div class="container py-5 w-25">
          <div class="row justify-content-center">
            <div class="col align-self-center">
              <h1>PredialX Cooperativa</h1>
              <div class="container py-3">
                <div class="row justify-content-center">
                  <div class="col align-self-center">
                    <form>
                      <div class="form-group row py-3">
                        <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="seuusuario@predialx.group" required onChange={e => setUserName(e.target.value)} />
                        <small id="emailHelp" class="form-text text-muted"></small>
                      </div>
                      <div class="form-group row py-3">
                        <label for="password">Senha</label>
                        <input type="password" class="form-control" id="password" placeholder="Senha" required onChange={e => setPassword(e.target.value)} />
                      </div>
                    </form>
                      <div class="form-group row py-3">
                        <button type="button" onClick={handleSubmit} class="btn btn-outline-success btn-lg btn-block">Entrar</button>
                      </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
 }
 Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
