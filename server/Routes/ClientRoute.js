const express = require("express");
const router = express.Router();
const ClientCtrl = require("../Controller/ClientCtrl");
const upload = require("../config/multer");
router.post("/client-first-form", ClientCtrl.createClientFirstForm);
// router.post("/client-first-form", ClientCtrl.createOrUpdateClientFirstForm);

router.post(
  "/add-client",
  upload.fields([
    { name: "proposedPlan.upload", maxCount: 1 },
    { name: "customerDoc[0][upload]" },
    { name: "customerDoc[1][upload]" },
    { name: "customerDoc[2][upload]" },
    // Add more as needed or dynamically handle in middleware
  ]),
  ClientCtrl.completeClientForm
);
router.get("/complete-client-form", ClientCtrl.getCompleteClientForms);
// router.get("/:id", ClientCtrl.fetchByidClientFirstForm);
// router.get("/full-client/:id", ClientCtrl.getFullClientDetailById);
router.get("/add-client/:id", ClientCtrl.getAddClientFormById);
router.put("/add-client/:id", ClientCtrl.updateAddClientForm);
router.put("/client-first-form/:id", ClientCtrl.updateClientFirstForm);
router.delete("/add-client/:id", ClientCtrl.deleteAddClientForm);
module.exports = router;
