const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')
app.use(express.static('public'))
app.set('view engine', 'ejs')


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods","GET,HEAD,POST,OPTIONS,PUT"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
//   });


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

// app.get('/docs', (req, res) => {
//     res.render('docs');
// })

// app.get('/resources', (req, res) => {
//     res.render('resources');
// })

// app.get('/getting_started', (req, res) => {
//     res.render('getting_started');
// })

// app.get('/sample_queries', (req, res) => {
//     res.render('sample_queries');
// })

// app.get('/alzkb', (req, res) => {
//     res.sendFile(path.resolve(__dirname,'views/alzkb.html'));
// })

app.get('/alzkb', (req, res) => {
    res.render('alzkb');
})


app.listen(5000)