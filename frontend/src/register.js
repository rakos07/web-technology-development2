import {Dispatcher} from 'flux';
import React from 'react';
import ReactDOM from 'react-dom';


import OrderConstans from './exports';
import store from './store';
import exports from './exports'
import WorkDetails from "./workDetails";
import Order from "./order";
import OrderCustomer from "./orderCustomer";
import FilterCustomer from "./filterCustomer";

class Register extends Dispatcher {
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const register = new Register();

register.register((data) => {
    if (data.payload.actionType !== OrderConstans.LISTORDERS) {
        return;
    }
    fetch('/customer/orders')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            store._queriedOrders = result;
            let incomplete = [];
            let complete = [];
            let worked = [];
            result.forEach((x) => {
                if (x.order.status === 'új') {
                    incomplete.push(x);
                } else if (x.order.status === 'feldolgozás alatt') {
                    worked.push(x);
                } else if (x.order.status === 'befejezett') {
                    complete.push(x);
                }
            });
            store._incompleteOrders = incomplete;
            store._completeOrders = complete;
            store._workedOrders = worked;
            store.runChange();
        });

    fetch('/customer/customers')
        .then((response)=>{return response.json()})
        .then((users)=>{
            store._users = users;
            store.runChange();
        })
});


register.register((data) => {
    if (data.payload.actionType !== OrderConstans.ORDERBYID) {
        return;
    }
    fetch('/customer/orders/?customerId=' + data.payload.payload)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            store._ordersForUsers = result;
            store.runChange();
        })

});

register.register((data) => {
    if (data.payload.actionType !== OrderConstans.SUBMIT) {
        return;
    }

    data.payload.payload.order.orderId = Math.round(Math.random() * 1000);

    if (data.payload.payload.order.customer.customerId === 0) {
        data.payload.payload.order.customer.customerId = Math.round(Math.random() * 1000);
    }


    data.payload.payload.order.shutter.shutterId = Math.round(Math.random() * 1000);

    fetch('/customer/submitOrder', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

register.register((data) => {
    if (data.payload.actionType !== exports.CUSTOMER) {
        return;
    }


    ReactDOM.render(
        React.createElement(OrderCustomer),
        document.getElementById('orderListTable')
    );
    ReactDOM.render(
        React.createElement(Order),
        document.getElementById('formDiv')
    );
    ReactDOM.render(
        React.createElement("div"),
        document.getElementById('work_details')
    );

    ReactDOM.render(
        React.createElement(FilterCustomer),
        document.getElementById('manager_invoice_panel')
    );

});


register.register((data) => {
    if (data.payload.actionType !== OrderConstans.WORKDETAILS) {
        return;
    }

    fetch('/customer/workDetails/?orderId=' + data.payload.payload)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            store._selectedOrder = result.order;
            store.runChange();

            ReactDOM.render(
                React.createElement(WorkDetails),
                document.getElementById('work_details')
            )


        });
});

export default register;