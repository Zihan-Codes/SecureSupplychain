const Harvest = require('../Models/Harvest');
const QRCode = require("qrcode");

// Create a new harvest entry
module.exports.createHarvest = async (req, res) => {
  try {
    let newHarvest = new Harvest(req.body);
    // console.log(newHarvest)
    const qrCode = await QRCode.toDataURL(newHarvest._id.toString());
    newHarvest.qrCode = qrCode;
    // console.log(newHarvest)

    await newHarvest.save();
    res.status(201).json(newHarvest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all harvest entries
module.exports.getHarvests = async (req, res) => {
  try {
    const harvests = await Harvest.find();
    res.status(200).json(harvests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get harvest entries by farmerId
module.exports.getHarvestsByFarmerId = async (req, res) => {
  try {
    const harvests = await Harvest.find({ farmerId: req.params.farmerId });
    res.status(200).json(harvests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get harvest entries by id
module.exports.getHarvestsById = async (req, res) => {
    try {
        const harvest = await Harvest.findById(req.params.id);
    //   console.log(harvests)
      res.status(200).json(harvest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };