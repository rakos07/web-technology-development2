
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';


const dbName = 'shutter_db';
const collectionName = 'orders';

function readRequests(findParams, callback) {
    var frontend = new MongoClient(url);
    frontend.connect((err) => {
        assert.equal(err, null);

        const db = frontend.db(dbName);
        const collection = db.collection(collectionName);

        collection.find(findParams).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        frontend.close();
    });
}





function orderRead(callback) {
    readRequests({}, (result) => {
        callback(result)
    })
}

function orderInCustomerRead(customerId, callback) {
    readRequests({"order.customer.customerId": customerId}, (result) => {
        callback(result)
    })
}

function orderCreate(request, callback) {
    var frontend = new MongoClient(url);

    frontend.connect((err) => {
        assert.equal(null, err);

        const db = frontend.db(dbName);
        const collection = db.collection(collectionName);


        collection.insertOne(request, (err, r) => {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            frontend.close();
            callback();
        })
    })
}

function orderByIdRead(orderId, callback) {
    readRequests({"order.orderId": orderId}, (result) => {
        callback(result)
    })
}


module.exports = {
    "orderCreate": orderCreate,
    "orderRead": orderRead,
    "orderInCustomerRead": orderInCustomerRead,
    "orderByIdRead" : orderByIdRead
};