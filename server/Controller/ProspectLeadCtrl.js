const ProspectLead = require("../Models/TestModel");
// Create a new prospect lead
exports.createProspectLead = async (req, res) => {
  try {
    console.log(req.body, "Prospect data");
    const newLead = new ProspectLead({ ...req.body, status: "prospect" });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Prospect leads
exports.getProspectLeads = async (req, res) => {
  try {
    const leads = await ProspectLead.find({ status: "prospect" });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Prospect lead by ID
exports.getProspectLeadById = async (req, res) => {
  try {
    const lead = await ProspectLead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Prospect lead by ID
exports.updateProspectLead = async (req, res) => {
  try {
    const updatedLead = await ProspectLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { ...req.body, status: "suspect" },
      { new: true } // returns the updated document
    );
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Prospect lead by ID
exports.deleteProspectLead = async (req, res) => {
  try {
    const deletedLead = await ProspectLead.findByIdAndDelete(req.params.id, {
      ...req.body,
      status: "prospect",
    });
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update only the status of a lead
exports.updateProspectLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedLead = await ProspectLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
