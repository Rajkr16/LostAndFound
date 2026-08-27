const Claim = require("../models/Claim");
const Item = require("../models/Item");
const User = require("../models/User");

const createClaim = async (req, res) => {
  try {
    const { message } = req.body;
    const { itemId } = req.params;

    // Check message
    if (!message) {
      return res.status(400).json({
        message: "Claim message is required."
      });
    }

    // Check if item exists
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    // User cannot claim their own item
    if (item.reportedBy.toString() === req.user.userId) {
      return res.status(400).json({
        message: "You cannot claim your own item."
      });
    }

    // Check if user has already submitted a claim
    const existingClaim = await Claim.findOne({
      item: itemId,
      claimant: req.user.userId
    });

    if (existingClaim) {
      return res.status(400).json({
        message: "You have already submitted a claim for this item."
      });
    }

    // Create claim
    const claim = await Claim.create({
      item: itemId,
      claimant: req.user.userId,
      message
    });

    res.status(201).json({
      message: "Claim submitted successfully.",
      claim
    });
  } catch (error) {
    console.error("Create claim error:", error);

    res.status(500).json({
      message: "Server error while creating claim."
    });
  }
};
const getMyItemClaims = async (req, res) => {
  try {
    // Find all items reported by the logged-in user
    const myItems = await Item.find({
      reportedBy: req.user.userId
    }).select("_id");

    const itemIds = myItems.map((item) => item._id);

    // Find claims for those items
    const claims = await Claim.find({
      item: { $in: itemIds }
    })
      .populate("item", "title type status")
      .populate("claimant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: claims.length,
      claims
    });
  } catch (error) {
    console.error("Get claims error:", error);

    res.status(500).json({
      message: "Server error while fetching claims."
    });
  }
};
const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      claimant: req.user.userId
    })
      .populate({
        path: "item",
        select: "title type category location status reportedBy",
        populate: {
          path: "reportedBy",
          select: "name email phone"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: claims.length,
      claims
    });
  } catch (error) {
    console.error("Get my claims error:", error);

    res.status(500).json({
      message: "Server error while fetching your claims."
    });
  }
};
const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { claimId } = req.params;

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected."
      });
    }

    // Find claim
    const claim = await Claim.findById(claimId).populate("item");

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found."
      });
    }

    // Only item owner can approve/reject
    if (claim.item.reportedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this claim."
      });
    }

    // Update claim status
    claim.status = status;
    await claim.save();

    // If approved, mark item as returned
    if (status === "approved") {
      await Item.findByIdAndUpdate(claim.item._id, {
        status: "returned"
      });
    }

    res.status(200).json({
      message: `Claim ${status} successfully.`,
      claim
    });
  } catch (error) {
    console.error("Update claim error:", error);

    res.status(500).json({
      message: "Server error while updating claim."
    });
  }
};
const getClaimContact = async (req, res) => {
  try {
    const { claimId } = req.params;

    const claim = await Claim.findById(claimId)
      .populate("item", "reportedBy title")
      .populate("claimant", "name email phone");

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found."
      });
    }

    // Contact information is available only after approval
    if (claim.status !== "approved") {
      return res.status(403).json({
        message: "Contact information is available only after claim approval."
      });
    }

    const userId = req.user.userId;

    const itemOwnerId = claim.item.reportedBy.toString();
    const claimantId = claim.claimant._id.toString();

    // Only item owner or claimant can see contact information
    if (
      userId !== itemOwnerId &&
      userId !== claimantId
    ) {
      return res.status(403).json({
        message: "You are not allowed to view this contact information."
      });
    }

    res.status(200).json({
      contact: {
        name: claim.claimant.name,
        email: claim.claimant.email,
        phone: claim.claimant.phone
      }
    });
  } catch (error) {
    console.error("Get contact error:", error);

    res.status(500).json({
      message: "Server error while fetching contact information."
    });
  }
};
module.exports = {
  createClaim,
  getMyItemClaims,
  getMyClaims,
  updateClaimStatus,
  getClaimContact
};