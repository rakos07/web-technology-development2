const approot = require('app-root-path');

function customerDAO(shutterDao) {

    winston = require('winston');
    md5 = require('md5.js');
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: {service: 'user-service'},
        transports: [
            new winston.transports.File({filename: 'error.log', level: 'error'})
        ]
    });
    if (shutterDao !== undefined && shutterDao != null) {
        this.shutterCustomer = shutterDao;
    } else {
        this.shutterCustomer = require(`${approot}/backend/src/customerDAO`)
    }
}


customerDAO.prototype.getOrderByOrderID = function (orderId, callback) {
    this.shutterCustomer.orderByIdRead(orderId, (requests) => {
        callback(requests);
    });
};

customerDAO.prototype.orders = function (callback) {
    this.shutterCustomer.orderRead((requests) => {
        callback(requests)
    });
};

customerDAO.prototype.orderincustomer = function (customerId, callback) {
    this.shutterCustomer.orderInCustomerRead(customerId, (requests) => {
        callback(requests)
    })
};

customerDAO.prototype.submitOrder = function (request, success, error) {

    this.shutterCustomer.orderInCustomerRead(request.order.customer.customerId, (resp) => {

        if (resp !== [] && !("undefined" === typeof(resp["order"]))){
            request.order.customer.name = resp[0].order.customer.name;
        }
    });

    request['order']['creationDate'] = new Date().toISOString();

    this.shutterCustomer.orderCreate(request, () => {
        success();
    })
};

customerDAO.prototype.workDetails = function (orderId, callback) {
     this.getOrderByOrderID(orderId, (resp) => {
         let order = resp[0];

         if (!("undefined" === typeof(order.order["workDetails"]))){
             callback(order)
         }
         else {
             order.order.workDetails = {
                 workID: "Feldolgozás alatt",
                 address: "Feldolgozás alatt",
                 date: "Feldolgozás alatt",
                 worker: "Feldolgozás alatt",
             };

             callback(order)
         }
     });
};

customerDAO.prototype.customers = function(callback) {
    this.shutterCustomer.orderRead((results)=>{
        let customers = [];
        results.forEach((result)=>{
           if (!customers.includes(result)){
               customers.push(
                   {customer: {customerId:result.order.customer.customerId, name:result.order.customer.name }}
                   );
           }
        });

        customers.forEach((cust)=>{
           delete cust.orderId;
           delete cust.shutter;
           delete cust.status;
           delete cust.creationDate;
        });

        callback(customers)
    })
};




module.exports = customerDAO;