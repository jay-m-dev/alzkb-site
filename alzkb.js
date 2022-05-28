const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('alzkb');
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

app.get('/alzkb', (req, res) => {
    res.render('alzkb_about');
})

app.get('/samples', (req, res) => {
    res.render('samples');
})


app.listen(5000)