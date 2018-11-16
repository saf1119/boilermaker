const router = require('express').Router()
const {UserList} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const userListItems = await UserList.findAll({
      where: {
        userId: userId
      }
    })
    res.json(userListItems)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  const {item, quantity} = req.body
  console.log('req.body', req.body)
  try{
    for(let i = 0; i < item.length; i++) {
      await UserList.create({
          name: item[i],
          quantity: quantity[i],
          userId: req.params.userId
      })
    }
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userListId', async (req, res, next) => {
  try {
    const destroyed = await UserList.destroy({
      where:
        {
          id: req.params.userListId
        }
    })
    res.json(destroyed)
  } catch(error) {
    console.log(error)
  }
})
