const SuspectLead = require("../Models/SuspectLeadModel");
// Create a new suspect lead
exports.createSuspectLead = async (req, res) => {
  try {
    console.log(req.body, "suspect data");
    const newLead = new SuspectLead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all suspect leads
exports.getSuspectLeads = async (req, res) => {
  try {
    const leads = await SuspectLead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single suspect lead by ID
exports.getSuspectLeadById = async (req, res) => {
  try {
    const lead = await SuspectLead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a suspect lead by ID
exports.updateSuspectLead = async (req, res) => {
  try {
    const updatedLead = await SuspectLead.findByIdAndUpdate(
      req.params.id,
      req.body,
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

// Delete a suspect lead by ID
exports.deleteSuspectLead = async (req, res) => {
  try {
    const deletedLead = await SuspectLead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
