const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

const port = 8080

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "wordless", "index.html")) 
})
