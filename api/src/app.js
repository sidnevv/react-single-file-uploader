const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

module.exports = app