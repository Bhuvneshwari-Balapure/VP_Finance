const ClientfirstForm = require("../Models/ClientFirstFormModel");

exports.createClientForm = async (req, res) => {
  try {
    const clientForm = new ClientfirstForm(req.body);
    await clientForm.save();
    res
      .status(201)
      .json({ message: "Client form saved successfully", data: clientForm });
  } catch (error) {
    console.error("Error saving client form:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
