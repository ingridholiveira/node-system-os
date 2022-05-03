import React, { Component, useState } from 'react';
import axios from 'axios';


class ContributorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributorId: props.contributorId,
      name: props.name,
      email: props.email,
      password: props.password,
      labelButton: props.action
    }
    this.clearForm = this.clearForm.bind(this);
    this.createContributor = this.createContributor.bind(this);
    this.inputIdRef = React.createRef();
    this.inputNameRef = React.createRef();
    this.inputEmailRef = React.createRef();
    this.inputPasswordRef = React.createRef();
  }
  clearForm() {
    this.setState({contributorId: null,      name: null,
      email: null,
      password: null,
      labelButton: 'Cadastrar'});
    this.inputIdRef.current.value = '';
    this.inputNameRef.current.value = '';
    this.inputEmailRef.current.value = '';
    this.inputPasswordRef.current.value = '';
    this.props.clearForm();
  }

  async createContributor(e) {
    //  setAppState({ loading: true });
    const req = { id: this.state.contributorId, name: this.state.name, email:this.state.email, password:this.state.password };

    var apiUrl;
    if (this.state.labelButton == 'Cadastrar') {
      apiUrl = 'http://localhost:3001/contributor';
      const resp = await axios.post(apiUrl, req);
      alert(resp.data.msg);
    } else {
      apiUrl = 'http://localhost:3001/contributor/' + this.props.contributorId;
      const resp = await axios.put(apiUrl, req);
      alert(resp.data.msg);
    }
    this.inputIdRef.current.value = '';
    this.inputNameRef.current.value = '';
    this.inputEmailRef.current.value = '';
    this.inputPasswordRef.current.value = '';
    this.props.createContributor();

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
              <h1>PredialX - Cadastro de Colaboradores</h1>
              <div class="container py-4  w-50">
                <div class="row justify-content-center">
                  <div class="col align-self-center">
                    <form>
                      <div class="form-group row py-2">
                        <label for="register" class="col-sm-2 col-form-label">Matrícula: </label>
                        <div class="col-sm-10">
                          <input type="number" class="form-control" id="register" name="contributorId" ref={this.inputIdRef} value={this.props.contributorId} onChange={this.handleChange}
                            placeholder="Digite o número de matrícula de cadastro como colaborador"
                            required />
                          <small id="registerHelp" class="form-text text-muted">Digite apenas números,
                            sem pontos ou espaços.</small>
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="contributor" class="col-sm-2 col-form-label">Colaborador: </label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="contributor" name="name" ref={this.inputNameRef} value={this.props.name} onChange={this.handleChange}
                            placeholder="Digite o nome completo do colaborador" required />
                          <small id="contributorHelp" class="form-text text-muted"></small>
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="email" class="col-sm-2 col-form-label">Email:</label>
                        <div class="col-sm-10">
                          <input type="email" class="form-control" id="email" name="email" value={this.props.email} ref={this.inputEmailRef} onChange={this.handleChange}
                            placeholder="Digite o principal email de contato fornecido pelo colaborador"
                            required />
                        </div>
                      </div>
                      <div class="form-group row py-2">
                        <label for="password" class="col-sm-2 col-form-label">Senha:</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="password" name="password" value={this.props.password} ref={this.inputPasswordRef} onChange={this.handleChange}
                            placeholder="Senha" required />
                        </div>
                      </div>
                    </form>
                    <div class="container py-3">
                      <div class="form-group row">
                      <button type="button" onClick={this.createContributor.bind()} class="btn btn-outline-success btn-block btn-lg me-3 w-25">{this.props.labelButton}</button>
                        {this.props.labelButton == 'Editar' &&
                          <button type="button" class="btn btn-outline-primary btn-lg w-25" onClick={this.clearForm.bind()}>Limpar</button>
                        }
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

export default ContributorForm;