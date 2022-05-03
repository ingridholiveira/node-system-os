import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: props.clientId,
      name: props.name,
      labelButton: props.action
    }
    this.inputIdRef = React.createRef();
    this.inputNameRef = React.createRef();
    this.clearForm = this.clearForm.bind(this);
    this.createClient = this.createClient.bind(this);
  }
  clearForm() {
    this.inputIdRef.current.value = '';
    this.inputNameRef.current.value = '';
    this.props.clearForm();
  }

  async createClient(e) {
    //  setAppState({ loading: true });
    const req = { id: this.state.clientId, name: this.state.name };
    var apiUrl;
    if (this.props.labelButton == 'Cadastrar') {
      apiUrl = 'http://localhost:3001/client';
      const resp = await axios.post(apiUrl, req);
      alert(resp.data.msg);
    } else {
      apiUrl = 'http://localhost:3001/client/' + this.props.clientId;
      const resp = await axios.put(apiUrl, req);
      alert(resp.data.msg);
    }
    
    this.inputIdRef.current.value = '';
    this.inputNameRef.current.value = '';
    this.props.createClient();


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
              <h1>PredialX - Cadastro de Clientes</h1>
              <div class="container  w-50">
                <div class="row justify-content-center mx-lg-n5">
                  <div class="col align-self-center">
                    <form>
                      <div class="form-group row">
                        <label for="CPF">CPF</label>
                        <input type="number" class="form-control" id="CPF" name="clientId" ref={this.inputIdRef} aria-describedby="" value={this.props.clientId} onChange={this.handleChange} placeholder="Digite o CPF do cliente" required />
                        <small id="cpfHelp" class="form-text text-muted">Digite apenas números, sem pontos, traços e espaço</small>
                      </div>
                      <div class="form-group row">
                        <label for="text">Nome</label>
                        <input type="text" class="form-control" id="client" value={this.props.name} ref={this.inputNameRef} name="name" onChange={this.handleChange} placeholder="Nome completo do cliente" required />
                      </div>
                      <div class="container py-3">
                        <div class="row align-self-center">
                        <button type="button" onClick={this.createClient.bind()} class="btn btn-outline-success btn-lg me-3 w-25">{this.props.labelButton}</button>
                        {this.props.labelButton == 'Editar' &&
                          <button type="button" class="btn btn-outline-primary btn-lg w-25" onClick={this.clearForm.bind()}>Limpar</button>
                        }
                        </div>
                      </div>
                    </form>
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

export default ClientForm;