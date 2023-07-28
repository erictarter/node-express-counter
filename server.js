const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 3004

let vueCounter = 0
let reactCounter = 0
let angularCounter = 0
let otherCounter = 0

// Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Route for incrementing the counter
app.get('/vuecounter/increment', (req, res) => {
  vueCounter++
  res.json({ vueCounter })
})

app.get('/reactcounter/increment', (req, res) => {
  reactCounter++
  res.json({ reactCounter })
})

app.get('/angularcounter/increment', (req, res) => {
  angularCounter++
  res.json({ angularCounter })
})

app.get('/othercounter/increment', (req, res) => {
  otherCounter++
  res.json({ otherCounter })
})

// Route for decrementing the counter
app.get('/vuecounter/decrement', (req, res) => {
  if (vueCounter > 0) {
    vueCounter--
  }
  res.json({ vueCounter })
})

app.get('/reactcounter/decrement', (req, res) => {
  if (reactCounter > 0) {
    reactCounter--
  }
  res.json({ reactCounter })
})

app.get('/angularcounter/decrement', (req, res) => {
  if (angularCounter > 0) {
    angularCounter--
  }
  res.json({ angularCounter })
})

app.get('/othercounter/decrement', (req, res) => {
  if (otherCounter > 0) {
    otherCounter--
  }
  res.json({ otherCounter })
})

app.get('/count/all', (req, res) => {
  res.json({ vueCounter, reactCounter, angularCounter, otherCounter })
})

app.get('/set-cookie', (req, res) => {
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'none',
    secure: true
  })
  res.send('Cookie set successfully!')
})

app.get('/', (req, res) => {
  res.send('Hello from Eric!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
