// const ClientFirstForm = require("../Models/ClientFirstFormModel");
// const AddClientForm = require("../Models/ClientModel");

// // Step 1: Create ClientFirstForm
// exports.createClientFirstForm = async (req, res) => {
//   try {
//     const clientData = req.body;
//     const newClient = await ClientFirstForm.create(clientData);
//     await newClient.save();
//     res.status(201).json(newClient);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Failed to create client first form", details: err });
//   }
// };

// // Step 2: Add extended client form
// exports.completeClientForm = async (req, res) => {
//   const { body } = req;
//   console.log("Complete Client Form Data:", body);

//   try {
//     const data = req.body;
//     // const newClientForm = await AddClientForm.create(data);
//     const newClientForm = await AddClientForm.create(data);
//     await newClientForm.save();
//     res.status(201).json(newClientForm);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Failed to complete client form", details: err });
//   }
// };
// // display complete form
// // Fetch all completed client forms
// exports.getCompleteClientForms = async (req, res) => {
//   try {
//     const clientForms = await AddClientForm.find(); // You can add filters if needed
//     res.status(200).json(clientForms);
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to fetch client forms",
//       details: err.message,
//     });
//   }
// };

// // Read by ID
// exports.getAddClientFormById = async (req, res) => {
//   try {
//     const addClientForm = await AddClientForm.findById(req.params.id);
//     if (!addClientForm)
//       return res.status(404).json({ message: "AddClientForm not found" });
//     res.status(200).json(addClientForm);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update
// exports.updateAddClientForm = async (req, res) => {
//   try {
//     const updatedForm = await AddClientForm.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedForm)
//       return res.status(404).json({ message: "AddClientForm not found" });
//     res.status(200).json(updatedForm);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete
// exports.deleteAddClientForm = async (req, res) => {
//   try {
//     const deletedForm = await AddClientForm.findByIdAndDelete(req.params.id);
//     if (!deletedForm)
//       return res.status(404).json({ message: "AddClientForm not found" });
//     res.status(200).json({ message: "AddClientForm deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const ClientFirstForm = require("../Models/ClientFirstFormModel");
const AddClientForm = require("../Models/ClientModel");

// ------------------- CREATE -------------------

// Step 1: Create Client First Form
exports.createClientFirstForm = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await ClientFirstForm.create(clientData);
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create client first form",
      details: err.message,
    });
  }
};
// // Update first form
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

// Step 2: Add Complete Client Form
exports.completeClientForm = async (req, res) => {
  try {
    const data = req.body;
    const newClientForm = await AddClientForm.create(data);
    res.status(201).json(newClientForm);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to complete client form", details: err.message });
  }
};

// ------------------- READ -------------------

// Fetch all complete client forms
exports.getCompleteClientForms = async (req, res) => {
  try {
    const clientForms = await AddClientForm.find();
    res.status(200).json(clientForms);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch client forms", details: err.message });
  }
};

// Fetch a single complete client form by ID
exports.getAddClientFormById = async (req, res) => {
  try {
    const addClientForm = await AddClientForm.findById(req.params.id);
    if (!addClientForm) {
      return res.status(404).json({ message: "AddClientForm not found" });
    }
    res.status(200).json(addClientForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- UPDATE -------------------

// Update complete client form
exports.updateAddClientForm = async (req, res) => {
  try {
    const updatedForm = await AddClientForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    if (!updatedForm) {
      return res.status(404).json({ message: "AddClientForm not found" });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ------------------- DELETE -------------------

// Delete complete client form
exports.deleteAddClientForm = async (req, res) => {
  try {
    const deletedForm = await AddClientForm.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "AddClientForm not found" });
    }
    res.status(200).json({ message: "AddClientForm deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
