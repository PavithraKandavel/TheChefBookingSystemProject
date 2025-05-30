module.exports = (app)=>{
    // user
    const user = require('../controllers/user.controller')
   
    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin);

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);

    app.post('/api/sendMessage', user.sendMessage);
    
    app.get('/api/getMessages', user.getMessages);

    app.get('/api/getUserBookings/:userId', user.getUserBookings);

    app.post('/api/submitReview', user.submitReview);

    app.get("/api/getUserReviews/:userId", user.getUserReviews);
}
