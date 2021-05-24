
const router = require("express").Router()
const videos = require("../model/videos.model")

router.route("/")
.get(async(req, res) => {
    try{
        const loadVideos = await videos.find({})
        res.json({
            success: true,
            video: loadVideos 
        })

    }catch(error){
        res.json({
            success: false,
            message: error
        })
    }
})

.post(async(req, res) => {
    try {
        const newVideo = req.body
        const saveVideo = await videos.insertMany(newVideo)

        res.status(201).json({
            success: true,
            video: newVideo,
            saveVideo
        })
        
    } catch (error) {

        res.json({
            success: false,
            message: error
        })
        
    }
})

router.param("videoID", async(req, res, next, videoID) => {
    try {

        const findVideoById = await videos.findOne({videoId: videoID})

        if(!findVideoById){
            res.json({
                success: false,
                message: "No video of this id"
            })
        }

        req.video = findVideoById
        next()
        
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }

})

router.route("/:videoID")
.get(async(req, res) => {
    try {
        
        const { video } = req

        res.json({
            success: true,
            video
        })

    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})
.post(async(req, res) => {
    try{

        const { video } = req
        const updateVideo = req.body
        const updatedVideo = await videos.updateOne({videoId: video.videoId}, updateVideo)

        res.status(201).json({
            success: true,
            updateVideo,
            updatedVideo
        })

    }catch(error){
        res.json({
            success: false,
            message: error
        })
    }
})

module.exports = router