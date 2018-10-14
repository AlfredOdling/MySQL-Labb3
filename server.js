const express = require('express')
const path = require('path')
const mysql = require('mysql')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(morgan('dev'))

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS 
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization')
  next()
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

getConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myDB'
  })
}

executeQuery = (res, query, queryArr) => {
  getConnection().query(query, queryArr, (err, rows, field) => {
    if (err) {
      console.log('ERROR: ', err)
      res.statusMessage = err
      res.status(500).end()
    } else {
      res.status(200).send(rows)
    }
  })
}

// --------- GET ---------

app.get('/orders', (req, res) => {
  const query = 'SELECT * FROM orders'
  executeQuery(res, query, null)
})

app.get('/customers', (req, res) => {
  const query = 'SELECT * FROM customers'
  executeQuery(res, query, null)
})

app.get('/all', (req, res) => {
  const query = 'SELECT * FROM orders'
  executeQuery(res, query, null)
})

// --------- POST ---------

app.post('/upload_order', (req, res) => {
  const {
    ord_order_id,
    ord_customer_id,
    ord_amount
  } = req.body

  const query = 
    'INSERT INTO orders (order_id, customer_id, amount)'+
    ' VALUES (?, ?, ?)'

  const queryArr = [ord_order_id, ord_customer_id, ord_amount]

  executeQuery(res, query, queryArr)
})

app.post('/upload_customer', (req, res) => {
  const {
    cust_customer_id,
    cust_customer_name,
  } = req.body

  const query = 
    'INSERT INTO customers (customer_id, customer_name)'+
    ' VALUES (?, ?)'

  const queryArr = [cust_customer_id, cust_customer_name]

  executeQuery(res, query, queryArr)
})

// --------- DELETE ---------

app.post('/delete_customer', (req, res) => {
  const { customer_id } = req.body

  const query = 
    'DELETE FROM customers'+
    ' WHERE customer_id='+customer_id

  executeQuery(res, query, null)
})

app.post('/delete_order', (req, res) => {
  const { order_id } = req.body
  
  const query = 
    'DELETE FROM orders'+
    ' WHERE order_id='+order_id

  executeQuery(res, query, null)
})

// --------- UPDATE ---------

app.post('/update_customer', (req, res) => {
  const { customer_id, customer_name } = req.body
  
  const query =
  'UPDATE customers'+
  ' SET customer_name='+customer_name+
  ' WHERE customer_id='+customer_id

  executeQuery(res, query, null)
})

app.post('/update_order', (req, res) => {
  const { order_id, amount } = req.body
  
  const query =
    'UPDATE orders'+
    ' SET amount='+amount+
    ' WHERE order_id='+order_id

  executeQuery(res, query, null)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
