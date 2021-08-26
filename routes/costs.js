const router = require('express').Router();
const jwtAuth = require('./middleware/jwtMiddleware');

const {
    getAllCosts,
    createNewCost,
    changeCostInfo,
    deleteCost
} = require('./conroller/cost.controller');

router.get('/', jwtAuth, getAllCosts);
router.post('/', jwtAuth, createNewCost);
router.patch('/:id', jwtAuth, changeCostInfo);
router.delete('/:id', jwtAuth, deleteCost);

// GET - costs
// GET - costs/:id
// POST - costs
// DELETE - costs/:id
// PATCH - costs/:id

module.exports = router;
