import React from 'react';
import store from './store';

class IncompleteOrders extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {orders: store._incompleteOrders};
    }

    _onChange() {
        this.setState({orders: store._queriedOrders})
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
                <table border = "1">
                    <tr>
                        <th>Szélesség</th>
                        <th>Magasság</th>
                        <th>Ár</th>
                        <th>Mennyiség</th>
                        <th>Vásárló ID</th>
                        <th>Vásárló neve</th>
                    </tr>
                    {this.state.orders.map((x) => {
                        return (
                            <tr>
                                <td>{x.order.shutter.width}</td>
                                <td>{x.order.shutter.height}</td>
                                <td>{x.order.shutter.price}</td>
                                <td>{x.order.shutter.quantity}</td>
                                <td>{x.order.customer.customerId}</td>
                                <td>{x.order.customer.name}</td>
                            </tr>);
                    })
                    }

                </table>
            </div>
        )

    }
}

export default IncompleteOrders;