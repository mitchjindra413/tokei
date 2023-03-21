var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/', async (req, res, next) => {
    const name = req.query.name
    if(!name) {
        return res.json([])
    }
    try {
        const accounts = await User.find({ username: { $regex: name, $options: 'i' } }).limit(5);
        
        const accountsObj = {}
        for (let acc of accounts) {
            accountsObj[acc._id] = {
                username: acc.username,
                profilePhoto: acc.profilePhoto,
                _id: acc._id 
            }
        }
        
        return res.json(accountsObj)
    } catch(err) {
        return res.json([])
    }
})

module.exports = router;