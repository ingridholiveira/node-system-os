import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      date: null,
      client: null,
      problem: null,
      contributor: null,
      labelButton: 'Registrar'
    }
    this.clearForm = this.clearForm.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  clearForm() {
    this.setState({orderId: null, name: null,
      orderId: null,
      date: null,
      client: null,
      problem: null,
      contributor: null,
      labelButton: 'Registrar'});
  }

  async createOrder(e) {
    //  setAppState({ loading: true });
    const req = { id: this.state.orderId, date: this.state.date, client: this.state.client, problem: this.state.problem, contributor: this.state.contributor };
    this.setState({ orderId: null, date: null, client: null, problem: null, contributor: null, labelButton: 'Registrar' });
    var apiUrl;
    if (this.state.labelButton == 'Registrar') {
      apiUrl = 'http://localhost:3001/order';
      const resp = await axios.post(apiUrl, req);
      alert(resp.data.msg);
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    })
  };

  render() {
    return (
      <div>
        <div class="container py-0 mb-4">
          <div class="row justify-content-center">
            <div class="col align-self-center">
              <h1>PredialX - Registro de Ordens de Serviços</h1>
              <div class="container  py-4 w-50">
                <div class="row justify-content-center mx-lg-n5">
                  <div class="col align-self-center">
                    <form>
                      <div class="form-group row py-2">
                        <label for="order" class="col-sm-2 col-form-label">Número da ordem: </label>
                        <div class="col-sm-10">
                          <input type="number" class="form-control" id="orderId" name ="orderId" value={this.state.orderId} onChange={this.handleChange}
                            placeholder="Digite o número de ordem segundo a sua tabela" required />
                          <small id="orderHelp" class="form-text text-muted">Digite apenas números, sem pontos, traços e espaço</small>
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="date" class="col-sm-2 col-form-label">Data de registro: </label>
                        <div class="col-sm-10">
                          <input type="date" class="form-control" id="date" name="date" value={this.state.date} onChange={this.handleChange} 
                            placeholder="" required />
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="CPF" class="col-sm-2 col-form-label">CPF do cliente: </label>
                        <div class="col-sm-10">
                          <input type="number" class="form-control" id="CPF" name ="client" value={this.state.client} onChange={this.handleChange} 
                            placeholder="CPF" required />
                          <small id="cpfHelp" class="form-text text-muted">Digite apenas números, sem pontos, traços e espaço</small>
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="text" class="col-sm-2 col-form-label">Problema relatado:</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="problem" name="problem" value={this.state.problem} onChange={this.handleChange}
                            placeholder="Digite aqui o problema relatado pelo cliente e os detalhes relevantes para sua resolução." required />
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="register" class="col-sm-2 col-form-label">Colaborador selecionado: </label>
                        <div class="col-sm-10">
                          <input type="number" class="form-control" id="register" name="contributor" value={this.state.contributor} onChange={this.handleChange}
                            placeholder="Digite o número de matrícula de cadastro como colaborador" required />
                          <small id="cnpjHelp" class="form-text text-muted">Digite o nome e matricula do colaborador</small>
                        </div>
                      </div>
                    </form>
                    <div>
                      <div class="form-group row py-2">
                        <button type="button" onClick={this.createOrder.bind()} class="btn btn-outline-success btn-lg btn-block">{this.state.labelButton}</button>
                      </div>
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
}

export default Orders;