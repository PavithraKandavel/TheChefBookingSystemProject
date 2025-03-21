module.exports = (app)=> {
    const admin = require('../controllers/admin.controller')
    
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
}