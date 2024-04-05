// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


// signup page
app.get('views/signup', function(req, res) {
    res.render('signup');
});


app.listen(8080);
console.log('8080 is the magic port');