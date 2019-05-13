import {EventEmitter} from 'events';


class Store extends EventEmitter {

    _queriedOrders = [];
    _ordersForUsers = [];
    _selectedOrder = {
        orderId: "Nincs",
        workDetails: {
            workID: "Feldolgozás alatt",
            address: "Feldolgozás alatt",
            date: "Feldolgozás alatt",
            worker: "Feldolgozás alatt",
        }
    };
    _incompleteOrders = [];
    _completeOrders = [];
    _workedOrders = [];
    _users = [];

    runChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

export default new Store();