const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 3004

const db = new sqlite3.Database('counters.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message)
  } else {
    console.log('Connected to the SQLite database.')
    db.run(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value INTEGER NOT NULL
      )
    `)
  }
})

const incrementCounter = (counterName, callback) => {
  db.serialize(() => {
    db.get(
      `SELECT value FROM counters WHERE name = ?`,
      [counterName],
      (err, row) => {
        if (err) {
          console.error('Error querying the database:', err.message)
        } else {
          let value = row ? row.value : 0
          value++
          db.run(
            `INSERT OR REPLACE INTO counters (name, value) VALUES (?, ?)`,
            [counterName, value],
            (err) => {
              if (err) {
                console.error('Error updating the counter:', err.message)
              } else {
                callback(value)
              }
            }
          )
        }
      }
    )
  })
}

// Function to decrement the counter in the database
const decrementCounter = (counterName, callback) => {
  db.serialize(() => {
    db.get(
      `SELECT value FROM counters WHERE name = ?`,
      [counterName],
      (err, row) => {
        if (err) {
          console.error('Error querying the database:', err.message)
        } else {
          let value = row ? row.value : 0
          if (value > 0) {
            value--
          }
          db.run(
            `INSERT OR REPLACE INTO counters (name, value) VALUES (?, ?)`,
            [counterName, value],
            (err) => {
              if (err) {
                console.error('Error updating the counter:', err.message)
              } else {
                callback(value)
              }
            }
          )
        }
      }
    )
  })
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
  db.all('SELECT name, value FROM counters', (err, rows) => {
    if (err) {
      console.error('Error querying the database:', err.message)
    } else {
      const counters = {}
      rows.forEach((row) => (counters[row.name] = row.value))
      res.json(counters)
    }
  })
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
