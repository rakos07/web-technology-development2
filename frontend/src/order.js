import React from 'react';
import store from './store';
import customerFunction from "./customerFunction";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order: {
                orderId: null,
                shutter: {
                    shutterId: null,
                    width: 0,
                    height: 0,
                    quantity: 1
                },
                status: "új",
                customer: {
                    customerId: 0,
                    name: ""
                }
            }
        };
    }

    _onChange() {
        this.setState({
        })
    }

    componentDidMount() {
        store.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._onChange);
    }

    _clearInputFields() {
        this.setState({
                order: {
                    orderId: null,
                    shutter: {
                        shutterId: null,
                        width: 0,
                        height: 0,
                        quantity: 1
                    },
                    status: "új",
                    customer: {
                        customerId: 0,
                        name: ""
                    }
                }
            }
        )
    };

    render() {
        return (
                <div>
                    <table>
                        <tr>
                            <td>
                                Szélesség
                            </td>
                            <td>
                                <input type="number" onChange={(event) => {
                                    this.state.order.shutter.width = event.target.value;
                                    this.setState({order: this.state.order})
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Magasság
                            </td>
                            <td>
                                <input type="number" onChange={(event) => {
                                    this.state.order.shutter.height = event.target.value;
                                    this.setState({order: this.state.order})
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Mennyiség
                            </td>
                            <td>
                                <input type="number" onChange={(event) => {
                                    this.state.order.shutter.quantity = event.target.value;
                                    this.setState({order: this.state.order})
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Vásárló ID
                            </td>
                            <td>
                                <input type="number" onChange={(event) => {
                                    this.state.order.customer.customerId = event.target.value;
                                    this.setState({order: this.state.order})
                                }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Vásárló neve
                            </td>
                            <td>
                                <input type="text" onChange={(event) => {
                                    this.state.order.customer.name = event.target.value;
                                    this.setState({order: this.state.order})
                                }}/>
                            </td>
                        </tr>
                    </table>

                            <button
                                onClick={() => {
                                    customerFunction.submitOrder(this.state);
                                    customerFunction.fetchOrders();
                                    this._clearInputFields();
                                }}
                                >Küldés
                            </button>

                </div>
            )
    }
}
export default Order;