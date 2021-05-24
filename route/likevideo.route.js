const router = require("express").Router()
const likeVideo = require("../model/likevideo.model")
const { route } = require("./dummy.route")

router.route("/")
.get(async(req, res) => {
    try {
        const loadLikeVideo = await likeVideo.find({})
        
        res.json({
            success: true, 
            likedvideo: loadLikeVideo
        })

    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
    
})
.post(async(req, res) => {
    try {

        const newLikeVideo = req.body

        const saveLikeVideo = await likeVideo.insertMany(newLikeVideo)

        res.status(201).json({
            success: true,
            likedVideo: newLikeVideo,
            saveLikeVideo
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})

router.param("likedVideoId", async(req, res, next, likedVideoId) => {
    try {

        const findLikeVideoById = await likeVideo.findOne({videoId: likedVideoId})

        if(!findLikeVideoById){
            res.json({
                success: false, 
                message: "No liked video of this Id"
            })
        }

        req.likedvideo = findLikeVideoById
        next()
        
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})

router.route("/:likedVideoId")
.get(async(req, res) => {

    try {
        
        const { likedvideo } = req

        res.json({
            success: true,
            likedvideo
        })
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})
.post(async(req, res) => {

    try {

        const { likedvideo } = req
        const updateLikedVideo = req.body

        const updatedLikedVideo = await likeVideo.updateOne({videoId: likedvideo.videoId}, updateLikedVideo)

        res.json({
            success: true,
            updateLikedVideo,
            updatedLikedVideo
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})
.delete(async(req, res) => {
    try {
        
        const { likedvideo } = req

        const deleteLikedVideo = await likeVideo.deleteOne({videoId: likedvideo.videoId})

        res.json({
            success: true,
            deleteLikedVideo,
            message: "Video removed from Liked"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
})

module.exports = router