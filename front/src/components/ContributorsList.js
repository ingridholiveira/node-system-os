import React, { Component, useState } from 'react';
import axios from 'axios'

class ContributorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributors: [],
      contributorId: null
    }
  }

  componentDidMount() {
    this.searchContributors();
  }
  async searchContributors() {

    //  setAppState({ loading: true });
    const apiUrl = 'http://localhost:3001/contributors';
    axios.get(apiUrl).then((resp) => {
      const contributorsData = resp.data;
      var colaboradores = [];

      contributorsData.contributors.map((contributor, index) => {
        colaboradores.push({
          id: contributor.id, name: contributor.name, email: contributor.email, password: contributor.password
        });
      });
      this.setState({ contributors: colaboradores });
    });

  };
  async deleteContributor(e) {
    //  setAppState({ loading: true });
    const apiUrl = 'http://localhost:3001/contributor/' + e.target.dataset.id;
    const resp = await axios.delete(apiUrl);
    this.searchContributors();
  }

  changeContributor(event) {
    this.setState({ clientId: event.target.dataset.id }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
    this.props.changeContributor(event.target.dataset.id);

  }

  render() {
    return (
      <div>
        <div class="container py-2 border p-3 mb-2 bg-primary text-white">
          <div class="row justify-content-center">
            <div class="col">
              <h3>Colaboradores Cadastrados</h3>
            </div>
          </div>
        </div>
        <div class="container py-2">
          <div class="row h5">
            <div class="col">
              <div>Matrícula</div>
            </div>
            <div class="col">
              <div>Nome</div>
            </div>
            <div class="col">
              <div>Email</div>
            </div>
            <div class="col">
              <div></div>
            </div>
            <div class="col">
              <div></div>
            </div>
          </div>
          {this.state.contributors.length > 0 &&
            this.state.contributors.map((contributor, index) => (
              <div class="row py-2">
                <div class="col">
                  <div>{contributor.id}</div>
                </div>
                <div class="col">
                  <div>{contributor.name}</div>
                </div>
                <div class="col">
                  <div>{contributor.email}</div>
                </div>
                <div class="col">
                  <button type="button" data-id={contributor.id} onClick={this.changeContributor.bind(this)} class="btn btn-outline-secondary btn-sm">Editar colaborador</button>
                </div>
                <div class="col">
                  <button type="button" data-id={contributor.id} onClick={this.deleteContributor.bind(this)} class="btn btn-outline-danger btn-sm">Excluir colaborador</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ContributorsList;