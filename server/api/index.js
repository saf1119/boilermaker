const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/weather', require('./weather'))
router.use('/lists', require('./lists'))
router.use('/userLists', require('./userLists'))

router.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})
