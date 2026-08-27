const express = require("express");

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;