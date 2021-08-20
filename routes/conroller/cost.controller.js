const Cost = require('../../schemas/costSchema');

module.exports.getAllCosts = async (req, res) => {
    try {
        const result = await Cost.find();
        res.send({ data: result.reverse() });
    } catch (error) {
        console.log(error);
    }
}

module.exports.createNewCost = async (req, res) => {
    try {
        const cost = await new Cost(req.body);
        cost.save();
        res.send(cost);
    } catch (error) {
        console.log(error);
    }
}

module.exports.changeCostInfo = async (req, res) => {
    try {
        const result = await Cost.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteCost = async (req, res) => {
    try {
        const result = await Cost.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}
