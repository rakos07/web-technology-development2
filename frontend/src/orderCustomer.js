import React from 'react';
import store from './store';
import customerFunction from "./customerFunction";

class OrderCustomer extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: store._ordersForUsers,

        };
    }

    _onChange() {
        this.setState({orders: store._ordersForUsers})
    }

    componentDidMount() {
        store.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._onChange);
    }


    render() {
        return (
            <div>

                <table border="1">
                    <thead>
                    <tr>
                        <th>Rendelés ID</th>
                        <th>Állapot</th>
                        <th>Vásárló ID</th>
                        <th>Vásárló neve</th>
                        <th>Részletek</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map((x) => {
                        return (
                            <tr
                                onClick={() => {
                                    customerFunction.showWorkDetails(x.order.orderId)
                                }}>
                                <td>{x.order.orderId}</td>
                                <td>{x.order.status}</td>
                                <td>{x.order.customer.customerId}</td>
                                <td>{x.order.customer.name}</td>
                                <td>
                                    Szélesség : {x.order.shutter.width},
                                    Magasság : {x.order.shutter.height}<br/>
                                    Mennyiség : {x.order.shutter.quantity},
                                    Ár : {x.order.shutter.price}</td>
                            </tr>);
                    })
                    }
                    </tbody>
                </table>
            </div>
        )

    }
}

export default OrderCustomer;