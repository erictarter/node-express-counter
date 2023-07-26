const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 3004

// In-memory database to store counter values
let counters = {
  vueCounter: 0,
  reactCounter: 0,
  angularCounter: 0,
  otherCounter: 0
}

// Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Function to fetch all counters from the database
function getCounters(res) {
  res.json(counters)
}

// Function to update a counter value in the database
function updateCounter(counterName, newValue, res) {
  counters[counterName] = newValue
  getCounters(res)
}

// Route for incrementing the counter
app.get('/vuecounter/increment', (req, res) => {
  updateCounter('vueCounter', counters.vueCounter + 1, res)
})

app.get('/reactcounter/increment', (req, res) => {
  updateCounter('reactCounter', counters.reactCounter + 1, res)
})

app.get('/angularcounter/increment', (req, res) => {
  updateCounter('angularCounter', counters.angularCounter + 1, res)
})

app.get('/othercounter/increment', (req, res) => {
  updateCounter('otherCounter', counters.otherCounter + 1, res)
})

// Route for decrementing the counter
app.get('/vuecounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, counters.vueCounter - 1)
  updateCounter('vueCounter', newCounterValue, res)
})

app.get('/reactcounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, counters.reactCounter - 1)
  updateCounter('reactCounter', newCounterValue, res)
})

app.get('/angularcounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, counters.angularCounter - 1)
  updateCounter('angularCounter', newCounterValue, res)
})

app.get('/othercounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, counters.otherCounter - 1)
  updateCounter('otherCounter', newCounterValue, res)
})

// Route to get all counters
app.get('/count/all', (req, res) => {
  getCounters(res)
})

// Root URL route
app.get('/', (req, res) => {
  res.send('Hello from Eric!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
