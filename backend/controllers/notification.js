const Notification = require('../models/notification');
const mongoose = require('mongoose')



const getAll = async (req, res) => {
    try {
        const userId = req.user._id;
        let query = { createdBy: { $in: [userId, null] },read:false };
        if (Object.keys(req.query).length !== 0) {
            
            // Check if req.query.search is present and not empty
            if (req.query.search) {
                query.name = { '$regex': req.query.search, '$options': 'i' };
            }
        }
        const notis = await Notification.find(query).sort({ createdAt: -1 }).limit(10);
        res.status(200).json({ data: notis })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const update = async (req, res) => {
    try {
        const ids = req.body.ids;
        if(ids.length > 0) {
            ids.map(async(id)=>{
                await Notification.findOneAndUpdate({ _id: id }, { read: true })
            });
            res.status(200).json({status:true})
        }
       
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}


module.exports = { getAll,update };