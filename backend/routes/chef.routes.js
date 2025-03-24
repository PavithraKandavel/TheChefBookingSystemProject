module.exports = (app)=>{
    // chef
    const chef = require('../controllers/chef.controller')
   
    app.post("/api/chefSignUp", chef.chefSignUp);

    app.post('/api/chefLogin',chef.chefLogin);

    app.put('/api/changechefPassword/:chefsRegId', chef.changechefPassword);

    
 // Availability routes
 app.post('/api/chefAvailability', chef.createChefAvailability);

 app.get('/api/chef-availability/:chefId', chef.getChefAvailabilityById);

 app.put('/api/chefAvailability/:availabilityId', chef.updateChefAvailability); // Correct route

 app.get('/api/chefs/search', chef.searchChefs);

 

}