const express = require('express')
const router = express.Router()
const winningAndMoney = require('../database/winningAndMoney')



router.get('/', async (req,res,next)=>{
    try{
        const matches = await winningAndMoney.findAll()
        res.json(matches)
    }
    catch(err){
        next(err)
    }
})

module.exports = router