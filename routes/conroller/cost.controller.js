const mongoose = require('mongoose');
const Cost = require('../../db/index');

module.exports.getAllCosts = (req, res, next) => {
    try {
        Cost.find().then(result => {
            res.send({ data: result });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.createNewCost = (req, res, next) => {
    try {
        const cost = new Cost(req.body);
        cost.save().then(result => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.changeCostInfo = async (req, res, next) => {
    try {
        await Cost.findOneAndUpdate({ _id: req.body._id }, req.body).then(result => {
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteCost = async (req, res, next) => {
    try {
        const result = await Cost.deleteOne({ _id: req.body._id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}
