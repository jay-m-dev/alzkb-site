const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(5000)