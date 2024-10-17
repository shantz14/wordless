const express = require("express")
const app = express()

const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

const port = 4000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "wordless", "index.html")) 
})

app.get('/api/win', (req, res) => {
    msg = "You win pal";
    jsonMsg = JSON.stringify(msg);
    res.send(jsonMsg);
})

app.get('/api/lose', (req, res) => {
    msg = "You lose bud";
    jsonMsg = JSON.stringify(msg);
    res.send(jsonMsg);
})

app.listen(port, () => {
    console.log("Listening on port: " + port)
})
