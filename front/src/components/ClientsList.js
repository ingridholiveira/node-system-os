import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            clientId: null
        }
    }
    componentDidMount() {
        this.searchClients();
    }
    async searchClients() {

        //  setAppState({ loading: true });
        const apiUrl = 'http://localhost:3001/clients';
        axios.get(apiUrl).then((resp) => {
            const clientsData = resp.data;
            var clientes = [];

            clientsData.clients.map((client, index) => {
                clientes.push({
                    id: client.id, name: client.name
                });
            });
            this.setState({ clients: clientes });
        });

    };
    async deleteClient(e) {
        //  setAppState({ loading: true });
        const apiUrl = 'http://localhost:3001/client/' + e.target.dataset.id;
        const resp = await axios.delete(apiUrl);
        this.searchClients();
    }

    changeClient(event) {
        this.setState({ clientId: event.target.dataset.id }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        });
        this.props.changeClient(event.target.dataset.id);

    }

    render() {
        return (
            <div>
                <div class="container py-2 border border-info border-1">
                    <div class="row justify-content-center">
                        <div class="col">
                            <h3>Clientes Cadastrados</h3>
                        </div>
                    </div>
                </div>
                <div class="container py-4">
                    <div class="row h5 py-2">
                        <div class="col">
                            <div>CPF</div>
                        </div>
                        <div class="col">
                            <div>Nome</div>
                        </div>
                        <div class="col">
                            <div></div>
                        </div>
                        <div class="col">
                            <div></div>
                        </div>
                    </div>
                    {this.state.clients.length > 0 &&
                        this.state.clients.map((client, index) => (
                            <div class="row py-2">
                                <div class="col">
                                    <div>{client.id}</div>
                                </div>
                                <div class="col">
                                    <div>{client.name}</div>
                                </div>
                                <div class="col">
                                    <button type="button" data-id={client.id} onClick={this.changeClient.bind(this)} class="btn btn-outline-secondary  btn-sm">Editar cliente</button>
                                </div>
                                <div class="col">
                                    <button type="button" data-id={client.id} onClick={this.deleteClient.bind(this)} class="btn btn-outline-danger btn-sm">Excluir cliente</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default ClientsList;