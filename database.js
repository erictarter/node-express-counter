const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Create or connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite3'))

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY,
    vueCounter INTEGER DEFAULT 0,
    reactCounter INTEGER DEFAULT 0,
    angularCounter INTEGER DEFAULT 0,
    otherCounter INTEGER DEFAULT 0
  )
`)

module.exports = db
