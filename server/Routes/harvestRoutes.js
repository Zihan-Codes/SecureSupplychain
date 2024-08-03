const express = require('express');
const { createHarvest, getHarvests, getHarvestsByFarmerId, getHarvestsById } = require('../Controllers/harvestController');

const router = express.Router();

// Route to create a new harvest entry
router.post('/harvest', createHarvest);

// Route to get all harvest entries
router.get('/harvest', getHarvests);

// Route to get harvest entries by farmerId
router.get('/harvest/farmer/:farmerId', getHarvestsByFarmerId);

// Route to get harvest entries by farmerId
router.get('/harvest/:id', getHarvestsById);

module.exports = router;
