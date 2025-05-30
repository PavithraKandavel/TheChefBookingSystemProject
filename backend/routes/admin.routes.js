module.exports = (app)=> {
    const admin = require('../controllers/admin.controller');
    const payment = require('../controllers/payment.controller')
    
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

    app.get("/api/totalCounts", admin.getTotalCounts);

    app.get("/api/getAllPayments", payment.getAllPayments);

    app.get("/api/getAllChefBookings", admin.getAllChefBookings);

    app.get("/api/getAllReviews", admin.getAllReviews);

    app.get("/api/getAllNotification", admin.getAllNotification);

    app.get("/api/getAllCount", admin.getAllCount);
    
}