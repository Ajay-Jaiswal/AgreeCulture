const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000 || process.env.PORT
const route = require("./route/route")

mongoose.connect("mongodb+srv://lankesh:YZMPw6IXM8OY1d8G@cluster0.thxzujr.mongodb.net/test",{
    useNewUrlParser : true
})

app.use(express.json())
app.use("/",route)

app.listen(PORT, ()=>{
    console.log(`Server is connected on port ${PORT}`)
})