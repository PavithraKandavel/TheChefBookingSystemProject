module.exports = (app)=>{
    // chef
    const chef = require('../controllers/chef.controller')
   
    app.post("/api/chefSignUp", chef.chefSignUp);

    app.post('/api/chefLogin',chef.chefLogin);

    app.put('/api/changechefPassword/:chefsRegId', chef.changechefPassword);

    

  

}