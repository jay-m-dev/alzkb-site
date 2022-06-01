const express = require('express')
// const path = require('path')
const config = require('./config')

const app = express()
const helmet = require('helmet')
// const ejs = require('ejs')
require('ejs')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(helmet())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.get('/', (req, res) => {
  res.render('alzkb', config)
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/alzkb', (req, res) => {
  res.render('alzkb_about')
})

app.get('/samples', (req, res) => {
  res.render('samples')
})

app.listen(config.PORT)
