// Import Mongo Connection Package(s)
// Setup Database Object

// Read all Products
const readProducts = () => {
    console.log('Read Products');
}
// Create a Product
const createProduct = (product) => {
    console.log('Create a Product');
}
// Update/Replace a Product
const upsertProduct = (id, product) => {
    console.log('Update/Replace a Product');
}
// Update/Modify a Product
const updateProduct = (id, product) => {
    console.log('Update/Modify a Product');
}
// Delete a Product
const deleteProduct = (id) => {
    console.log('Delete a Product');
}

// Export CRUD Function
module.exports = {
    readProducts,
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
}
