const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()


const db_connect = require("./databaseConnect/database_Connect")
db_connect

const Dummy = require("./model/dummy.model")
const dummyV1 = require("./route/dummy.route")

const videoListing = require("./route/video.route")

const likevideo = require("./route/likevideo.route")

const playlist = require("./route/playlist.route")


const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3002

console.log(port)

app.use("/dummy", dummyV1)

app.use("/videolisting", videoListing)
app.use("/likevideos", likevideo)
app.use("/playlist", playlist)

app.post("/", async(req, res) => {
    const newData = req.body
    // console.log()
    const saveData = await Dummy.insertMany(newData)
    res.json({
        success: true,
        newData
    })
})



app.get("/", (req, res) => {
    res.json({
        message: "video library"
    })
})

app.listen(port, () => {
    console.log("server connected")
})