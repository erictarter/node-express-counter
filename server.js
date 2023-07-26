const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 3004

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/counterDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const counterSchema = new mongoose.Schema({
  name: String,
  count: Number
})

const Counter = mongoose.model('Counter', counterSchema)

let vueCounter = 0
let reactCounter = 0
let angularCounter = 0
let otherCounter = 0

// Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Helper function to update the counter in the database
const updateCounter = async (counterName, value) => {
  try {
    const counter = await Counter.findOne({ name: counterName })
    if (counter) {
      counter.count = value
      await counter.save()
    } else {
      await Counter.create({ name: counterName, count: value })
    }
  } catch (err) {
    console.error('Error updating counter:', err)
  }
}

// Route for incrementing the counter
app.get('/vuecounter/increment', async (req, res) => {
  vueCounter++
  await updateCounter('vueCounter', vueCounter)
  res.json({ vueCounter })
})

app.get('/reactcounter/increment', async (req, res) => {
  reactCounter++
  await updateCounter('reactCounter', reactCounter)
  res.json({ reactCounter })
})

app.get('/angularcounter/increment', async (req, res) => {
  angularCounter++
  await updateCounter('angularCounter', angularCounter)
  res.json({ angularCounter })
})

app.get('/othercounter/increment', async (req, res) => {
  otherCounter++
  await updateCounter('otherCounter', otherCounter)
  res.json({ otherCounter })
})

// Route for decrementing the counter
app.get('/vuecounter/decrement', async (req, res) => {
  if (vueCounter > 0) {
    vueCounter--
    await updateCounter('vueCounter', vueCounter)
  }
  res.json({ vueCounter })
})

app.get('/reactcounter/decrement', async (req, res) => {
  if (reactCounter > 0) {
    reactCounter--
    await updateCounter('reactCounter', reactCounter)
  }
  res.json({ reactCounter })
})

app.get('/angularcounter/decrement', async (req, res) => {
  if (angularCounter > 0) {
    angularCounter--
    await updateCounter('angularCounter', angularCounter)
  }
  res.json({ angularCounter })
})

app.get('/othercounter/decrement', async (req, res) => {
  if (otherCounter > 0) {
    otherCounter--
    await updateCounter('otherCounter', otherCounter)
  }
  res.json({ otherCounter })
})

// Route to get all counters
app.get('/count/all', async (req, res) => {
  try {
    const counters = await Counter.find()
    const countersObject = counters.reduce((acc, counter) => {
      acc[counter.name] = counter.count
      return acc
    }, {})
    res.json(countersObject)
  } catch (err) {
    console.error('Error fetching counters:', err)
    res.status(500).json({ error: 'Error fetching counters' })
  }
})

app.get('/set-cookie', (req, res) => {
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'none',
    secure: true
  })
  res.send('Cookie set successfully!')
})

app.get('/', (req, res) => {
  res.send('Hello from the root path!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
