const Registrar = require("../Models/RegistrarModel");

// Create new Registrar
exports.createRegistrar = async (req, res) => {
  try {
    const registrar = new Registrar(req.body);
    const savedRegistrar = await registrar.save();
    res.status(201).json(savedRegistrar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Registrars
exports.getAllRegistrars = async (req, res) => {
  try {
    const registrars = await Registrar.find();
    res.status(200).json(registrars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single Registrar by ID
exports.getRegistrarById = async (req, res) => {
  try {
    const registrar = await Registrar.findById(req.params.id);
    if (!registrar)
      return res.status(404).json({ error: "Registrar not found" });
    res.status(200).json(registrar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Registrar by ID
exports.updateRegistrar = async (req, res) => {
  try {
    const updatedRegistrar = await Registrar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRegistrar)
      return res.status(404).json({ error: "Registrar not found" });
    res.status(200).json(updatedRegistrar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Registrar by ID
exports.deleteRegistrar = async (req, res) => {
  try {
    const deletedRegistrar = await Registrar.findByIdAndDelete(req.params.id);
    if (!deletedRegistrar)
      return res.status(404).json({ error: "Registrar not found" });
    res.status(200).json({ message: "Registrar deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
