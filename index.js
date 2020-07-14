require('dotenv').config();
// Require Format 1
const ProductsDAL = require('./data/products');
// Require Format 2
const {
    readProducts,
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
} = require('./data/products');

const newProduct = {
    name: "Switch",
    price: 299.99,
    brand: "Nintendo",
    size: {
        weight: "1 lbs",
        height: "4 inches",
        length: "10 inches",
        depth: ".5 inches"
    }
}

const upsertProductData = {
    name: "Gameboy",
    price: 34.55,
    brand: "Nintendo",
    size: {
        weight: "1 lbs",
        height: "4 inches",
        length: "10 inches",
        depth: ".5 inches"
    }
}

const main = () => {
    console.log('Entry Point');
    console.log(`Welcome, ${process.env.NAME}`);
    // console.log('--------------');
    // // Run Functions using Require Format 1
    // ProductsDAL.readProducts();
    // ProductsDAL.createProduct();
    // ProductsDAL.upsertProduct();
    // ProductsDAL.updateProduct();
    // ProductsDAL.deleteProduct();
    // console.log('--------------');

    // Run Functions using Require Format 2
    readProducts().then((data) => {
        console.log('Read:', data);
    });
    createProduct(newProduct).then((data) => {
        console.log('Create:', data);
    });
    upsertProduct("5f0cd141fccf68a40463f125", upsertProductData).then((data)=> {
        console.log('Update/Replace', data);
    });
    updateProduct("5f0cd141fccf60130463f125", { price: 1000.98 }).then((data) => {
        console.log('Update/Modify:', data);
    });
    deleteProduct("5f0dd70ec0f0630c61306f91").then((data) => {
        console.log('Delete:', data);
    });
}

main();