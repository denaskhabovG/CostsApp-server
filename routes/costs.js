const router = require('express').Router();

const {
    getAllCosts,
    createNewCost,
    changeCostInfo,
    deleteCost
} = require('./conroller/cost.controller');

router.get('/', getAllCosts);
router.post('/', createNewCost);
router.patch('/:id', changeCostInfo);
router.delete('/:id', deleteCost);

// GET - costs
// GET - costs/:id
// POST - costs
// DELETE - costs/:id
// PATCH - costs/:id

module.exports = router;
