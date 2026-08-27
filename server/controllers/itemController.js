const Item = require("../models/Item");

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      image
    } = req.body;

    // Check required fields
    if (!title || !description || !category || !type || !location || !date) {
      return res.status(400).json({
        message: "Please provide all required fields."
      });
    }

    // Create item
    const item = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      image: image || "",
      reportedBy: req.user.userId
    });

    res.status(201).json({
      message: "Item reported successfully.",
      item
    });
  } catch (error) {
    console.error("Create item error:", error);

    res.status(500).json({
      message: "Server error while creating item."
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const { search, type, category, location } = req.query;

    const filter = {};

    // Search in title and description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by lost/found
    if (type) {
      filter.type = type;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i"
      };
    }

    const items = await Item.find(filter)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: items.length,
      items
    });
  } catch (error) {
    console.error("Get items error:", error);

    res.status(500).json({
      message: "Server error while fetching items."
    });
  }
};
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("reportedBy", "name email");

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    res.status(200).json({
      item
    });
  } catch (error) {
    console.error("Get item error:", error);

    res.status(500).json({
      message: "Server error while fetching item."
    });
  }
};
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    // Only the person who reported the item can update it
    if (item.reportedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this item."
      });
    }

    const {
      title,
      description,
      category,
      type,
      location,
      date,
      status,
      image
    } = req.body;

    item.title = title ?? item.title;
    item.description = description ?? item.description;
    item.category = category ?? item.category;
    item.type = type ?? item.type;
    item.location = location ?? item.location;
    item.date = date ?? item.date;
    item.status = status ?? item.status;
    item.image = image ?? item.image;

    const updatedItem = await item.save();

    res.status(200).json({
      message: "Item updated successfully.",
      item: updatedItem
    });
  } catch (error) {
    console.error("Update item error:", error);

    res.status(500).json({
      message: "Server error while updating item."
    });
  }
};
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    // Only the person who reported the item can delete it
    if (item.reportedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this item."
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully."
    });
  } catch (error) {
    console.error("Delete item error:", error);

    res.status(500).json({
      message: "Server error while deleting item."
    });
  }
};
module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};