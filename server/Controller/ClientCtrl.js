const ClientFirstForm = require("../Models/ClientFirstFormModel");
const AddClientForm = require("../Models/ClientModel");

// Step 1: Create ClientFirstForm
exports.createClientFirstForm = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await ClientFirstForm.create(clientData);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create client first form", details: err });
  }
};

// Step 2: Add extended client form
exports.completeClientForm = async (req, res) => {
  const { body } = req;
  console.log("Complete Client Form Data:", body);

  try {
    const data = req.body;
    // const newClientForm = await AddClientForm.create(data);
    const newClientForm = await AddClientForm.create(data);
    await newClientForm.save();
    res.status(201).json(newClientForm);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to complete client form", details: err });
  }
};

// Get full client detail (with first form populated)
exports.getFullClientDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const fullData = await AddClientForm.findOne({
      clientFirstFormId: id,
    }).populate("clientFirstFormId");
    res.json(fullData);
  } catch (err) {
    res.status(500).json({ error: "Failed to get full client", details: err });
  }
};

// Read by ID
exports.getAddClientFormById = async (req, res) => {
  try {
    const addClientForm = await AddClientForm.findById(req.params.id);
    if (!addClientForm)
      return res.status(404).json({ message: "AddClientForm not found" });
    res.status(200).json(addClientForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateClientFirstForm = async (req, res) => {
  try {
    const updatedForm = await ClientFirstForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedForm)
      return res.status(404).json({ message: "ClientFirstForm not found" });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.fetchByidClientFirstForm = async (req, res) => {
  try {
    const form = await ClientFirstForm.findById(req.params.id);
    if (!form)
      return res.status(404).json({ message: "ClientFirstForm not found" });
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update
exports.updateAddClientForm = async (req, res) => {
  try {
    const updatedForm = await AddClientForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedForm)
      return res.status(404).json({ message: "AddClientForm not found" });
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
exports.deleteAddClientForm = async (req, res) => {
  try {
    const deletedForm = await AddClientForm.findByIdAndDelete(req.params.id);
    if (!deletedForm)
      return res.status(404).json({ message: "AddClientForm not found" });
    res.status(200).json({ message: "AddClientForm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
