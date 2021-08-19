const router = require('express').Router();

const {
    getAllCosts,
    createNewCost,
    changeCostInfo,
    deleteCost
} = require('./conroller/cost.controller');

router.get('/allCosts', getAllCosts);
router.post('/createNewCost', createNewCost);
router.patch('/changeCostInfo', changeCostInfo);
router.delete('/deleteCost', deleteCost);

module.exports = router;
