const AMC = require("../Models/AMCModel");
const Registrar = require("../Models/RegistrarModel");
const { default: mongoose } = require("mongoose");
// Create new AMC
exports.createAMC = async (req, res) => {
  try {
    console.log(req.body, "Req.body AMC");
    const { Registrar } = req.body;

    // Find the product by name
    const RegistrarExist = await Registrar.findOne({
      registrarName: Registrar,
    });
    if (!RegistrarExist) {
      return res.status(400).json({ error: "Invalid Registrar Product Id" });
    }
    // Replace name with ObjectId
    req.body.Registrar = RegistrarExist._id;

    const AMC = new AMC(req.body);
    await AMC.save();

    res.status(201).json(AMC);
    console.log(AMC, "Saved AMC");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all AMCs
exports.getAllAMCs = async (req, res) => {
  try {
    // const AMCs = await AMC.find();
    const AMCs = await AMC.find().populate("Registrar", "name");

    res.status(200).json(AMCs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single AMC by ID
exports.getAMCById = async (req, res) => {
  try {
    const AMC = await AMC.findById(req.params.id);
    if (!AMC) return res.status(404).json({ error: "AMC not found" });
    res.status(200).json(AMC);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update AMC by ID
exports.updateAMC = async (req, res) => {
  try {
    const { Registrar } = req.body;

    if (Registrar) {
      let product = null;

      // If the Registrar is not a valid ObjectId, treat it as a name
      if (!mongoose.Types.ObjectId.isValid(Registrar)) {
        product = await Registrar.findOne({ name: Registrar });
        if (!product) {
          return res
            .status(400)
            .json({ error: "Invalid financial Product name" });
        }
        req.body.Registrar = product._id;
      } else {
        product = await Registrar.findById(Registrar);
        if (!product) {
          return res
            .status(400)
            .json({ error: "Invalid financial Product Id" });
        }
      }
    }

    const updatedAMC = await AMC.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("Registrar");
    if (!updatedAMC) return res.status(404).json({ error: "AMC not found" });
    res.status(200).json(updatedAMC);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete AMC by ID
exports.deleteAMC = async (req, res) => {
  try {
    const deletedAMC = await AMC.findByIdAndDelete(req.params.id);
    if (!deletedAMC) return res.status(404).json({ error: "AMC not found" });
    res.status(200).json({ message: "AMC deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
