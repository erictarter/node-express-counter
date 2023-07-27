const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 3004

// Require the SQLite database connection
const db = require('./database')

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
  db.run(
    'UPDATE counters SET vueCounter = vueCounter + 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Failed to increment vueCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT vueCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }
        vueCounter = row.vueCounter
        res.json({ vueCounter })
      })
    }
  )
})

app.get('/reactcounter/increment', (req, res) => {
  db.run(
    'UPDATE counters SET reactCounter = reactCounter + 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to increment reactCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT reactCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }
        reactCounter = row.reactCounter
        res.json({ reactCounter })
      })
    }
  )
})

app.get('/angularcounter/increment', (req, res) => {
  db.run(
    'UPDATE counters SET angularCounter = angularCounter + 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to increment angularCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT angularCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }
        angularCounter = row.angularCounter
        res.json({ angularCounter })
      })
    }
  )
})

app.get('/othercounter/increment', (req, res) => {
  db.run(
    'UPDATE counters SET otherCounter = otherCounter + 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to increment otherCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT otherCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }
        otherCounter = row.otherCounter
        res.json({ otherCounter })
      })
    }
  )
})

// Route for decrementing the counter
app.get('/vuecounter/decrement', (req, res) => {
  db.run(
    'UPDATE counters SET vueCounter = vueCounter - 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Failed to decrement vueCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT vueCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }

        // Update the counter in memory as well
        if (vueCounter > 0) {
          vueCounter--
        }

        res.json({ vueCounter })
      })
    }
  )
})

app.get('/reactcounter/decrement', (req, res) => {
  db.run(
    'UPDATE counters SET reactCounter = reactCounter - 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to decrement reactCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT reactCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }

        // Update the counter in memory as well
        if (reactCounter > 0) {
          reactCounter--
        }

        res.json({ reactCounter })
      })
    }
  )
})

app.get('/angularcounter/decrement', (req, res) => {
  db.run(
    'UPDATE counters SET angularCounter = angularCounter - 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to decrement angularCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT angularCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }

        // Update the counter in memory as well
        if (angularCounter > 0) {
          angularCounter--
        }

        res.json({ angularCounter })
      })
    }
  )
})

app.get('/othercounter/decrement', (req, res) => {
  db.run(
    'UPDATE counters SET otherCounter = otherCounter - 1 WHERE id = 1',
    (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ error: 'Failed to decrement otherCounter' })
      }

      // Fetch the updated value from the database and send it in the response
      db.get('SELECT otherCounter FROM counters WHERE id = 1', (err, row) => {
        if (err) {
          console.error(err)
          return res
            .status(500)
            .json({ error: 'Failed to fetch counter value' })
        }

        // Update the counter in memory as well
        if (otherCounter > 0) {
          otherCounter--
        }

        res.json({ otherCounter })
      })
    }
  )
})

app.get('/count/all', (req, res) => {
  db.get(
    'SELECT vueCounter, reactCounter, angularCounter, otherCounter FROM counters WHERE id = 1',
    (err, row) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: 'Failed to fetch counters' })
      }

      // Update the counters in memory as well
      vueCounter = row.vueCounter
      reactCounter = row.reactCounter
      angularCounter = row.angularCounter
      otherCounter = row.otherCounter

      res.json(row)
    }
  )
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
