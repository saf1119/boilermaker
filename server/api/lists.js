const router = require('express').Router()
const {List, ListItem} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(lists)
  } catch (err) {
    next(err)
  }
})

router.get('/list/:listId', async (req, res, next) => {
  try {
    const list = await List.findOne({
      where: {
        id: req.params.listId
      },
      include: [{model: ListItem}]
    })
    res.json(list)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const title = req.body.title
    const place = req.body.place
    const summary = req.body.summary
    const listItems = req.body.listItems
    const newList = await List.create({
      title: title,
      userId: userId,
      place: place,
      weatherSummary: summary
    })
    listItems.forEach(async listItem => {
      await ListItem.create({
        name: listItem.name,
        quantity: listItem.quantity,
        listId: newList.id
      })
    })
    const list = await List.findOne({
      where: {
        id: newList.id
      },
      include: [{model: ListItem}]
    })
    res.json(list)
  } catch (error) {
    next(error)
  }
})

router.put('/update/:listId', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const listItems = req.body.listItems
    await ListItem.destroy({
      where: {
        listId: req.params.listId
      }
    })
    for(let i = 0; i<listItems.length; ++i) {
      await ListItem.create({
        name: listItems[i].name,
        quantity: listItems[i].quantity,
        listId: req.params.listId
      })
    }

    const list = await List.findOne({
      where: {
        id: req.params.listId
      },
      include: [{model: ListItem}]
    })
    res.json(list)
  } catch (error) {
    next(error)
  }
})
