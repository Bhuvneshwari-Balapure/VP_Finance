const express = require("express");
const router = express.Router();
const ClientCtrl = require("../Controller/ClientCtrl");

router.post("/client-first-form", ClientCtrl.createClientFirstForm);
// router.post("/client-first-form", ClientCtrl.createOrUpdateClientFirstForm);

router.post("/add-client", ClientCtrl.completeClientForm);
router.get("/:id", ClientCtrl.fetchByidClientFirstForm);
router.get("/add-client/:id", ClientCtrl.getAddClientFormById);
router.get("/full-client/:id", ClientCtrl.getFullClientDetails);
router.put("/add-client/:id", ClientCtrl.updateAddClientForm);
router.put("/client-first-form/:id", ClientCtrl.updateClientFirstForm);
router.delete("/add-client/:id", ClientCtrl.deleteAddClientForm);
module.exports = router;
