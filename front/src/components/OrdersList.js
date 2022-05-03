import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'


class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.searchOrders();
    }
    searchOrders() {

        //  setAppState({ loading: true });
        const apiUrl = 'http://localhost:3001/orders';
        axios.get(apiUrl).then((resp) => {
            const ordersData = resp.data;
            var ordens = [];

            ordersData.orders.map((order, index) => {
                ordens.push({
                    id: order.id, date: order.date, client: order.client, problem: order.problem, contributor: order.contributor
                });
            });
            this.setState({ orders: ordens });
        });

    };
    render() {
        return (
            <div>
                <div class="container py-0">
                    <div class="row justify-content-center">
                        <div class="col">
                            <h1>PredialX - Ordens de Serviços</h1>
                        </div>
                    </div>
                </div>
                <div class="container py-3">
                    <div class="row h4">
                        <div class="col">
                            <div>Ordem</div>
                        </div>
                        <div class="col">
                            <div>Cliente</div>
                        </div>
                        <div class="col">
                            <div>Data</div>
                        </div>
                        <div class="col">
                            <div>Colaborador</div>
                        </div>
                        <div class="col">
                            <div>Ocorrência</div>
                        </div>
                    </div>
                    {this.state.orders.length > 0 &&
                        this.state.orders.map((order, index) => (
                            <div class="row">
                                <div class="col">
                                    <div>{order.id}</div>
                                </div>
                                <div class="col">
                                    <div>{order.client}</div>
                                </div>
                                <div class="col">
                                    <div>{order.date}</div>
                                </div>
                                <div class="col">
                                    <div>{order.contributor}</div>
                                </div>
                                <div class="col">
                                    <div>{order.problem}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default OrdersList;