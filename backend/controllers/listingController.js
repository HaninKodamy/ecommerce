const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Listing = require('../models/Listing');
const Category = require('../models/Category');

// Controller to create a new listing
exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category, 
      seller,
      location,
      images,
      quantityStock, 
    } = req.body;

    const categoryObj = await Category.findById(category);

    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const newListing = new Listing({
      title,
      description,
      price,
      category: categoryObj._id,
      seller,
      location,
      images,
      quantityStock, 
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to get all listings
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ title: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListingsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category; 
    // First, find the category object by name
    const categoryObj = await Category.findOne({ name: categoryName });
    if (!categoryObj) {
      return res.status(404).json({ error: 'Category not found' });
    }
    // Then find listings by the category object ID
    const listings = await Listing.find({ category: categoryObj._id }).populate('category');
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchListing = async (req, res) => {
  try {
    const searchText = req.params.searchText;
    const listing = await Listing.find({ title: searchText });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a listing by ID
exports.updateListingById = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.listingId);
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      req.body,
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a listing by ID
exports.deleteListingById = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);

    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};