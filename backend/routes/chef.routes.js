module.exports = (app)=>{
    // chef
    const chef = require('../controllers/chef.controller');
    const payment = require('../controllers/payment.controller');
   
    app.post("/api/chefSignUp", chef.chefSignUp);

    app.post('/api/chefLogin',chef.chefLogin);

    app.put('/api/changechefPassword/:chefsRegId', chef.changechefPassword);

    
    // Availability routes
    app.post('/api/chefAvailability', chef.createChefAvailability);

    app.get('/api/getChefAvailabilityById/:chefId', chef.getChefAvailabilityById);

    app.put('/api/updateChefAvailability/:availabilityId', chef.updateChefAvailability); // Correct route

    app.get('/api/chefs/search', chef.searchChefs);

    app.post('/api/bookChef', chef.bookChef);

    app.get('/api/getChefBookings/:chefId', chef.getChefBookings);

    app.post("/api/proceedPayment", payment.proceedPayment);

    app.get("/api/getChefPayments/:chefId", payment.getChefPayments);

    app.get("/api/getChefReviews/:chefId", chef.getChefReviews);

    app.get("/api/getChefNotification/:chefId", chef.getChefNotification);


}