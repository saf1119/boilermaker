const router = require('express').Router()
module.exports = router
const axios = require('axios')

var googleMapsClient = require('@google/maps').createClient({
	key: process.env.mapsKey
})

router.get('/:place', async (req, res, next) => {
	try {
		await googleMapsClient.geocode(
			{
				address: req.params.place
			},
			async function(err, response) {
				if (!err) {
					const results = response.json.results
					const latitude = results[0].geometry.location.lat
					const longitude = results[0].geometry.location.lng
					const info = await axios.get(
						`https://api.darksky.net/forecast/${
							process.env.key
						}/${latitude},${longitude}`
					)
					const weatherResults = {
						summary: info.data.daily.summary,
						data: info.data.daily.data
					}
					res.json(weatherResults)
				} else {
					console.log('Error - geocode retreival failed')
				}
			}
		)
	} catch (error) {
		next(error)
	}
})
