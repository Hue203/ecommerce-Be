const Cycle = require("../Models/Cycle");
const cycleController = {};

cycleController.createCycle = async (req, res, next) => {
  try {
    let { cycleName, price } = req.body;
    cycleName = cycleName.toLowerCase();
    console.log(cycleName);
    let cycle = await Cycle.findOne({ cycleName: cycleName });
    if (cycle) {
      throw new Error("Cycle already Exists");
    }
    cycle = await Cycle.create({
      cycleName,
      price,
    });

    res.status(200).json({
      success: true,
      data: cycle,
      message: "cycle create Scuccess",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

cycleController.getCycle = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalCycle = await Cycle.count({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalCycle / limit);
    const offset = limit * (page - 1);
    const cycle = await Cycle.find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { cycle, totalPages },
      message: "get cycles success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = cycleController;
