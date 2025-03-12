module.exports = (app)=> {
    const admin = require('../controllers/admin.controller');
    const category = require('../controllers/category.controller');

    
    // create admin
    app.post('/api/createAdmin', admin.createAdmin);
    
    // admin login 
    app.post('/api/adminLogin', admin.adminLogin);

    // Get all user 
    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);

    // Get All chef
    app.get('/api/getAllChefs', admin.getAllChef);

    // Update chef
    app.put('/api/editChef/:chefId', admin.editChef);

    // Delete chef route
    app.delete('/api/deleteChef/:chefId', admin.deleteChef);


    // Category routes
    app.post('/api/admin/categories', category.createCategory); // Create a category
    app.get('/api/admin/getAllCategories', category.getAllCategories); // Get all categories
    app.put('/api/admin/updateCategory/:categoryId', category.updateCategory); // Update a category
    app.delete('/api/admin/deleteCategory/:categoryId', category.deleteCategory); // Delete a category
}