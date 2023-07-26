const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const jsonfile = require('jsonfile')
const app = express()
const port = 3004
const databasePath = './poll_data.json'

// Function to initialize the database file with initial counter values
function initializeDatabase() {
  const initialData = {
    vueCounter: 0,
    reactCounter: 0,
    angularCounter: 0,
    otherCounter: 0
  }
  jsonfile.writeFileSync(databasePath, initialData)
}

// Initialize the database file if it doesn't exist
if (!jsonfile.existsSync(databasePath)) {
  initializeDatabase()
}

// Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Function to read the database file
function readDatabase() {
  try {
    const data = jsonfile.readFileSync(databasePath)
    // Convert counter values to numbers
    data.vueCounter = Number(data.vueCounter) || 0
    data.reactCounter = Number(data.reactCounter) || 0
    data.angularCounter = Number(data.angularCounter) || 0
    data.otherCounter = Number(data.otherCounter) || 0
    return data
  } catch (error) {
    console.error('Error reading database file:', error.message)
    return {}
  }
}

// Function to write data to the database file
function writeDatabase(data) {
  try {
    jsonfile.writeFileSync(databasePath, data)
  } catch (error) {
    console.error('Error writing to database file:', error.message)
  }
}

// Function to fetch all counters from the database
function getCounters(res) {
  const data = readDatabase()
  res.json(data)
}

// Function to update a counter value in the database
function updateCounter(counterName, newValue, res) {
  const data = readDatabase()
  data[counterName] = newValue
  writeDatabase(data)
  getCounters(res)
}

// Route for incrementing the counter
app.get('/vuecounter/increment', (req, res) => {
  updateCounter('vueCounter', readDatabase().vueCounter + 1, res)
})

app.get('/reactcounter/increment', (req, res) => {
  updateCounter('reactCounter', readDatabase().reactCounter + 1, res)
})

app.get('/angularcounter/increment', (req, res) => {
  updateCounter('angularCounter', readDatabase().angularCounter + 1, res)
})

app.get('/othercounter/increment', (req, res) => {
  updateCounter('otherCounter', readDatabase().otherCounter + 1, res)
})

// Route for decrementing the counter
app.get('/vuecounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, readDatabase().vueCounter - 1)
  updateCounter('vueCounter', newCounterValue, res)
})

app.get('/reactcounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, readDatabase().reactCounter - 1)
  updateCounter('reactCounter', newCounterValue, res)
})

app.get('/angularcounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, readDatabase().angularCounter - 1)
  updateCounter('angularCounter', newCounterValue, res)
})

app.get('/othercounter/decrement', (req, res) => {
  const newCounterValue = Math.max(0, readDatabase().otherCounter - 1)
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
