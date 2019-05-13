import React from 'react';
import store from './store';

class WorkDetails extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order: store._selectedOrder,
            valid: true

        };
    }

    _onChange() {
        this.setState({order: store._selectedOrder})
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
                    <thead>
                    <tr>
                        <th>Rendelés ID</th>
                        <th>Munka ID</th>
                        <th>Dátum</th>
                        <th>Dolgozó</th>
                        <th>Cím</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.order.orderId}</td>
                        <td>{this.state.order.workDetails.workID}</td>
                        <td>{this.state.order.workDetails.date}</td>
                        <td>{this.state.order.workDetails.worker}</td>
                        <td>{this.state.order.workDetails.address}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )


    }
}

export default WorkDetails;