const router = require('express').Router();
const { json } = require('express');
const playList = require('../model/playlist.model');

router
	.route('/')
	.get(async (req, res) => {
		try {
			const loadPlayList = await playList.find({});

			res.json({
				success: true,
				playlist: loadPlayList,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	})
	.post(async (req, res) => {
		try {
			const newPlaylist = req.body;

			const savePlaylist = await new playList(newPlaylist).save();

			res.json({
				success: true,
				playlists: newPlaylist,
				playlist: savePlaylist,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	});

router.param('playlistId', async (req, res, next, playlistId) => {
	try {
		const findPlayListById = await playList.findById({ _id: playlistId });

		if (!findPlayListById) {
			res.json({
				success: false,
				message: 'No playlist of this id',
			});
		}
		req.playlist = findPlayListById;
		next();
	} catch (error) {
		res.json({
			success: false,
			message: error,
		});
	}
});

router
	.route('/:playlistId')
	.get(async (req, res) => {
		try {
			const { playlist } = req;
			res.json({
				success: true,
				playlist,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	})

	.post(async (req, res) => {
		try {
			const { playlist } = req;

			const updatePlayList = req.body;

			const saveUpdatedPlaylist = await playList.updateOne(
				{ _id: playlist._id },
				updatePlayList,
			);

			res.json({
				success: true,
				updatePlayList,
				saveUpdatedPlaylist,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	})
	.patch(async (req, res) => {
		try {
			const { playlist } = req;

			const updatePlaylist = req.body;

			const saveUpdatePlayList = await playList.updateOne(
				{ _id: playlist._id },
				{ $push: { videos: req.body } },
			);

			res.json({
				success: true,
				updatePlaylist,
				saveUpdatePlayList,
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	})
	.delete(async (req, res) => {
		try {
			const { playlist } = req;

			const deletePlayList = await playList.deleteOne({ _id: playlist._id });

			res.json({
				success: true,
				deletePlayList,
				message: 'Playlist deleted successfully',
			});
		} catch (error) {
			res.json({
				success: false,
				message: error,
			});
		}
	});

module.exports = router;
