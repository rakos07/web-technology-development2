import React from 'react';
import store from './store';
import CustomerActions from "./customerFunction";

class FilterCustomer extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: store._users,
            order: {
                customerId: 0
            }
        }
    }

    _onChange() {
        this.setState({
            orders: store._users
        })
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
                <div>
                    <div>
                        <div>
                            <select onChange={(event) => {
                                this.state.order.customerId = event.target.value;
                                this.setState({order: this.state.order})
                            }}
                            >
                                <option defaultValue={null} label="Válasszon"></option>
                                {this.state.orders.map((x) => {
                                    return (
                                        <option key={x.customer.customerId}
                                                value={x.customer.customerId}>{x.customer.customerId} {x.customer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button
                                onClick={() => {
                                    CustomerActions.orderByID(this.state.order.customerId);
                                    CustomerActions.fetchOrders();
                                }}
                                >Keresés
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>)
    }
}

export default FilterCustomer;