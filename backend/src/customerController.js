var express = require('express');
var shutter = express.Router();
const {check, validationResult} = require('express-validator/check');

const approot = require('app-root-path');
var service = require(`${approot}/backend/src/customerService`);
var dao = require(`${approot}/backend/src/customerDAO`);
var daoservice = new service(dao);


shutter.get('/customer/orders', (req, res) => {

    if (req.query['customerId'] !== undefined) {

        var customerID = parseInt(req.query['customerId']);
        daoservice.orderincustomer(customerID, (requests) => {
            res.status(200).send(requests)
        });
        return;
    }else if (req.query['orderId'] !== undefined) {

        var orderId = parseInt(req.query['orderId']);
        daoservice.getOrderByOrderID(orderId, (requests) => {
            res.status(200).send(requests)
        });
        return;
    }

    daoservice.orders((requests) => {
        res.status(200).send(requests)
    })

});


shutter.get('/customer/workDetails', (req, res) => {
    var orderId = parseInt(req.query['orderId']);
    daoservice.workDetails(orderId, (requests) => {
        res.status(200).send(requests)
    })

});

shutter.get('/customer/customers', (req, res) => {
    daoservice.customers((requests) => {
        res.status(200).send(requests)
    })

});

shutter.post('/customer/submitOrder', [
        check('order.customer.name').isString(),
        check('order.customer.customerId').isInt(),
        check('order.status').isString()

    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {

            req.body['order']['orderId'] = parseInt(req.body['order']['orderId']);
            req.body['order']['customer']['customerId'] = parseInt(req.body['order']['customer']['customerId']);
            const serviceCost=800;

            let shutter = req.body.order.shutter;

                req.body.order.shutter.price=((serviceCost + (shutter.width * 250 + shutter.height*350) * req.body.order.shutter.quantity)/100);


            daoservice.submitOrder(
                {order: req.body['order']},
                () => {
                    res.status(200).send("Order recorded")
                },
                (cause) => {
                    res.status(400).send(cause)
                }
            )
        }
    }
);

module.exports = shutter;