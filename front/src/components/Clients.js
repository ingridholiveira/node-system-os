import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import ClientsList from './ClientsList';
import ClientForm from './ClientForm';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: null,
      name: null,
      action: 'Cadastrar'
    }
    this.client = React.createRef();
    this.clientForm = React.createRef();
    this.loadFormClient = this.loadFormClient.bind(this);
    this.clearClientForm = this.clearClientForm.bind(this);
    this.createClient = this.createClient.bind(this);

  }
  async loadFormClient(id) {
    const apiUrl = 'http://localhost:3001/client/' + id;
    var client = await axios.get(apiUrl);
    this.setState({ clientId: client.data[0].id, name: client.data[0].name, action: 'Editar' });

  }
  clearClientForm() {
    this.setState({ clientId: null, name: null, action: 'Cadastrar' });
  }

  createClient() {
    this.client.current.searchClients();
    this.setState({ clientId: null, name: null, action: 'Cadastrar' });
  }

  render() {
    return (
      <div>
        <ClientForm clearForm={this.clearClientForm} createClient={this.createClient} 
          clientId={this.state.clientId} name={this.state.name} labelButton={this.state.action} />
        <ClientsList ref={this.client} changeClient={this.loadFormClient} />
      </div>
    );
  }
}

export default Clients;