// Import Mongo Connection Package(s)
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const { ObjectId } = require('mongodb'); // Alternative to above
const assert = require('assert');

// Setup Database Objects
const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const col_name = process.env.COL_NAME;
const options = {
    useUnifiedTopology: true
}

// Read all Products, using the 'find' Mongo Function
const readProducts = () => {
    const iou = new Promise((resolve, reject)=> {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs);
                client.close();
            })
        });
    }); 
    return iou;
}
// Read all Products, using the 'find' Mongo Function
const readProductByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({ _id: new ObjectID(id)}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
            })
        });
    });
    return iou;
}
// Create a Product, using the 'insert' Mongo Function
const createProduct = (product) => {
    const iou = new Promise((resolve, reject)=>{
        MongoClient.connect(url, options, (err, client)=>{
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(product, (err, result)=> {
                assert.equal(err, null);
                resolve(result.ops[0]);
                client.close();
            });
        });
    });
    return iou;
}
// Update/Replace a Product, using the 'updateOne' Mongo Function
const upsertProduct = (id, product) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findAndModify({ _id: new ObjectID(id) },
                null,
                { $set: { ...product } },
                { upsert: true },
                (err, result) => {
                    assert.equal(err, null);
                    readProductByID(id)
                        .then(product => resolve(product))
                        .then(() => client.close());
                }
            );
        });
    });
    return iou;
}
// Update/Modify a Product, using the 'updateOne' Mongo Function
const updateProduct = (id, product) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndUpdate({ _id: new ObjectID(id) }, 
                { $set: { ...product } },
                (err, result)=> {
                    assert.equal(err, null);
                    readProductByID(result.value._id)
                        .then(product => resolve(product))
                        .then(() => client.close());
                }
            );
        });
    });
    return iou;
}
// Delete a Product, using the 'deleteOne' Mongo Function
const deleteProduct = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete( { _id: new ObjectID(id) }, (err, result) => {
                assert.equal(err, null);
                resolve(result.value);
                client.close();
            });
        });
    });
    return iou;
}

// Export CRUD Function
module.exports = {
    readProducts,
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
}
