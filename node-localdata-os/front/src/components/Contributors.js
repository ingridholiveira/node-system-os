import React, { Component, useState } from 'react';
import ContributorForm from './ContributorForm';
import ContributorsList from './ContributorsList';
import axios from 'axios';

class Contributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributorId: null,
      name: null,
      email: null,
      password: null,
      action: 'Cadastrar'
    }
    this.contributor = React.createRef();
    this.contributorForm = React.createRef();
    this.loadFormContributor = this.loadFormContributor.bind(this);
    this.clearContributorForm = this.clearContributorForm.bind(this);
    this.createContributor = this.createContributor.bind(this);
  }
  async loadFormContributor(id) {
    const apiUrl = 'http://localhost:3001/contributor/' + id;
    var contributor = await axios.get(apiUrl);
    this.setState({ contributorId: contributor.data[0].id, name: contributor.data[0].name, email: contributor.data[0].email, password: contributor.data[0].password, action: 'Editar' });

  }
  clearContributorForm() {
    this.setState({
      contributorId: null, name: null,
      email: null,
      password: null,
      labelButton: 'Cadastrar'
    });
  }

  createContributor() {
    this.contributor.current.searchContributors();
    this.setState({
      contributorId: null, name: null,
      email: null,
      password: null,
      labelButton: 'Cadastrar'
    });
  }

  render() {
    return (
      <div>
        <ContributorForm clearForm={this.clearContributorForm} createContributor={this.createContributor} contributorId={this.state.contributorId} name={this.state.name}
          email={this.state.email} password={this.state.password} labelButton={this.state.action} />
        <ContributorsList ref={this.contributor} changeContributor={this.loadFormContributor} />
      </div>
    );
  }
}

export default Contributors;