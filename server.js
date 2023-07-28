const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Database } = require('better-sqlite3')

const app = express()
const port = 3004

const db = new Database('counters.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message)
  } else {
    console.log('Connected to the SQLite database.')
    db.exec(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value INTEGER NOT NULL
      )
    `)
  }
})

const incrementCounter = (counterName, callback) => {
  const stmt = db.prepare('SELECT value FROM counters WHERE name = ?')
  const row = stmt.get(counterName)
  let value = row ? row.value : 0
  value++

  const updateStmt = db.prepare(
    'INSERT OR REPLACE INTO counters (name, value) VALUES (?, ?)'
  )
  updateStmt.run(counterName, value)

  callback(value)
}

const decrementCounter = (counterName, callback) => {
  const stmt = db.prepare('SELECT value FROM counters WHERE name = ?')
  const row = stmt.get(counterName)
  let value = row ? row.value : 0
  if (value > 0) {
    value--
  }

  const updateStmt = db.prepare(
    'INSERT OR REPLACE INTO counters (name, value) VALUES (?, ?)'
  )
  updateStmt.run(counterName, value)

  callback(value)
}

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.get('/vuecounter/increment', (req, res) => {
  incrementCounter('vueCounter', (value) => {
    res.json({ vueCounter: value })
  })
})

app.get('/reactcounter/increment', (req, res) => {
  incrementCounter('reactCounter', (value) => {
    res.json({ reactCounter: value })
  })
})

app.get('/angularcounter/increment', (req, res) => {
  incrementCounter('angularCounter', (value) => {
    res.json({ angularCounter: value })
  })
})

app.get('/othercounter/increment', (req, res) => {
  incrementCounter('otherCounter', (value) => {
    res.json({ otherCounter: value })
  })
})

app.get('/vuecounter/decrement', (req, res) => {
  decrementCounter('vueCounter', (value) => {
    res.json({ vueCounter: value })
  })
})

app.get('/reactcounter/decrement', (req, res) => {
  decrementCounter('reactCounter', (value) => {
    res.json({ reactCounter: value })
  })
})

app.get('/angularcounter/decrement', (req, res) => {
  decrementCounter('angularCounter', (value) => {
    res.json({ angularCounter: value })
  })
})

app.get('/othercounter/decrement', (req, res) => {
  decrementCounter('otherCounter', (value) => {
    res.json({ otherCounter: value })
  })
})

app.get('/count/all', (req, res) => {
  const stmt = db.prepare('SELECT name, value FROM counters')
  const rows = stmt.all()

  const counters = {}
  rows.forEach((row) => (counters[row.name] = row.value))

  res.json(counters)
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
