const app = require('./src/app')
const upload = require('./src/multer')

const PORT = process.env.PORT || 5000

app.post('/api/v1/upload', upload.array('file', 1), (req, res) => {
    try {
        res.send(req.files[0])
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.listen(PORT, (err) => {
    if (err) console.error(`ERROR: ${err.message}`)
    console.log(`Listen on port ${PORT}`)
})