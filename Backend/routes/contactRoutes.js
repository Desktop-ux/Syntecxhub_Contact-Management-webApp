const express = require("express");

const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const protect = require("../middleware/authMiddleware");
const validateContact = require("../middleware/contactValidation");

const router = express.Router();

router.use(protect);

router.post("/", validateContact, createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", validateContact, updateContact);
router.delete("/:id", deleteContact);

module.exports = router;