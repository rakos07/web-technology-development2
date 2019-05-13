import exports from './exports';
import register from './register';

class CustomerFunction {
    fetchOrders() {
        register.handleViewAction({
            actionType: exports.LISTORDERS,
            payload: null
        })
    }

    orderByID(customerID) {
        register.handleViewAction({
            actionType: exports.ORDERBYID,
            payload: customerID
        })
    }


    submitOrder(order) {
        register.handleViewAction({
            actionType: exports.SUBMIT,
            payload: order
        })
    }

    showWorkDetails(orderId) {
        register.handleViewAction({
            actionType: exports.WORKDETAILS,
            payload: orderId
        })
    }
}

export default new CustomerFunction();