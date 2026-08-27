const express = require("express");
const {
  createClaim,
  getMyItemClaims,
  getMyClaims,
  updateClaimStatus,
  getClaimContact
} = require("../controllers/claimController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:itemId", protect, createClaim);

router.get("/my-items", protect, getMyItemClaims);

router.get("/my-claims", protect, getMyClaims);

router.get("/:claimId/contact", protect, getClaimContact);

router.put("/:claimId", protect, updateClaimStatus);
module.exports = router;