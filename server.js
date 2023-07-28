const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const admin = require('firebase-admin')
const app = express()
const port = 3004

const path = require('path')
const serviceAccountPath = path.join(
  __dirname,
  'private',
  'poll-counter-9716a-firebase-adminsdk-cslmx-6931824643.json'
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  databaseURL: 'https://your-firebase-project-id.firebaseio.com'
})

// Reference to the Firebase Realtime Database
const db = admin.database()
const counterRef = db.ref('counters')

// Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.get('/vuecounter/increment', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    counters.vueCounter = (counters.vueCounter || 0) + 1
    await counterRef.set(counters)
    res.json({ vueCounter: counters.vueCounter })
  } catch (err) {
    console.error('Error incrementing Vue counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/reactcounter/increment', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    counters.reactCounter = (counters.reactCounter || 0) + 1
    await counterRef.set(counters)
    res.json({ reactCounter: counters.reactCounter })
  } catch (err) {
    console.error('Error incrementing React counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/angularcounter/increment', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    counters.angularCounter = (counters.angularCounter || 0) + 1
    await counterRef.set(counters)
    res.json({ angularCounter: counters.angularCounter })
  } catch (err) {
    console.error('Error incrementing Angular counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/othercounter/increment', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    counters.otherCounter = (counters.otherCounter || 0) + 1
    await counterRef.set(counters)
    res.json({ otherCounter: counters.otherCounter })
  } catch (err) {
    console.error('Error incrementing Other counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/vuecounter/decrement', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    if (counters.vueCounter > 0) {
      counters.vueCounter--
      await counterRef.set(counters)
    }
    res.json({ vueCounter: counters.vueCounter })
  } catch (err) {
    console.error('Error decrementing Vue counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/reactcounter/decrement', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    if (counters.reactCounter > 0) {
      counters.reactCounter--
      await counterRef.set(counters)
    }
    res.json({ reactCounter: counters.reactCounter })
  } catch (err) {
    console.error('Error decrementing React counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/angularcounter/decrement', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    if (counters.angularCounter > 0) {
      counters.angularCounter--
      await counterRef.set(counters)
    }
    res.json({ angularCounter: counters.angularCounter })
  } catch (err) {
    console.error('Error decrementing Angular counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/othercounter/decrement', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    if (counters.otherCounter > 0) {
      counters.otherCounter--
      await counterRef.set(counters)
    }
    res.json({ otherCounter: counters.otherCounter })
  } catch (err) {
    console.error('Error decrementing Other counter:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/count/all', async (req, res) => {
  try {
    const snapshot = await counterRef.once('value')
    const counters = snapshot.val() || {}
    res.json(counters)
  } catch (err) {
    console.error('Error fetching counter data:', err)
    res.status(500).json({ error: 'Internal server error' })
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
  res.send('Hello from Eric!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
