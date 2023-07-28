const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 3004

let counterData = {
  vueCounter: 0,
  reactCounter: 0,
  angularCounter: 0,
  otherCounter: 0
}

const saveCounterDataToFile = () => {
  fs.writeFile('counterData.json', JSON.stringify(counterData), (err) => {
    if (err) {
      console.error('Error saving counter data:', err)
    }
  })
}

fs.readFile('counterData.json', (err, data) => {
  if (!err) {
    try {
      counterData = JSON.parse(data)
    } catch (e) {
      console.error('Error parsing counter data:', e)
    }
  }
})

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.get('/vuecounter/increment', (req, res) => {
  counterData.vueCounter++
  saveCounterDataToFile()
  res.json({ vueCounter: counterData.vueCounter })
})

app.get('/reactcounter/increment', (req, res) => {
  counterData.reactCounter++
  saveCounterDataToFile()
  res.json({ reactCounter: counterData.reactCounter })
})

app.get('/angularcounter/increment', (req, res) => {
  counterData.angularCounter++
  saveCounterDataToFile()
  res.json({ angularCounter: counterData.angularCounter })
})

app.get('/othercounter/increment', (req, res) => {
  counterData.otherCounter++
  saveCounterDataToFile()
  res.json({ otherCounter: counterData.otherCounter })
})

app.get('/vuecounter/decrement', (req, res) => {
  if (counterData.vueCounter > 0) {
    counterData.vueCounter--
    saveCounterDataToFile()
  }
  res.json({ vueCounter: counterData.vueCounter })
})

app.get('/reactcounter/decrement', (req, res) => {
  if (counterData.reactCounter > 0) {
    counterData.reactCounter--
    saveCounterDataToFile()
  }
  res.json({ reactCounter: counterData.reactCounter })
})

app.get('/angularcounter/decrement', (req, res) => {
  if (counterData.angularCounter > 0) {
    counterData.angularCounter--
    saveCounterDataToFile()
  }
  res.json({ angularCounter: counterData.angularCounter })
})

app.get('/othercounter/decrement', (req, res) => {
  if (counterData.otherCounter > 0) {
    counterData.otherCounter--
    saveCounterDataToFile()
  }
  res.json({ otherCounter: counterData.otherCounter })
})

app.get('/count/all', (req, res) => {
  res.json(counterData)
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
