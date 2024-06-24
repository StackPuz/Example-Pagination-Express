const express = require('express')
const mysql = require('mysql')
const config = require('./config')

let con = mysql.createConnection({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password
})

let app = express()
app.use(express.static('public'))
app.get('/api/products', (req, res) => {
  let page = req.query.page || 1
  let size = parseInt(req.query.size) || 10
  let order = mysql.raw(req.query.order || 'id')
  let direction = mysql.raw(req.query.direction || 'asc')
  let offset = (page - 1) * size
  con.query('select * from product order by ? ? limit ? offset ?', [ order, direction, size, offset ], (error, result) => {
    res.send(result)
  })
})
app.listen(8000)