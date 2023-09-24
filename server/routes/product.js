const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const Product = require('../models/product');
  // read
  // ​ http://localhost:8080/
  
  router.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
  })
  
  //http://localhost:8080/create
  router.post("/create", async (req, res) => {
    
    try {
      // Convert string dates to Date objects
      const mnfDateObj = new Date(req.body.mnfdate);
      const expDateObj = new Date(req.body.expDate);
  
      // Check if exp date is greater than or equal to mnf-date
      if (expDateObj < mnfDateObj) {
        return res.status(400).json({
          success: false,
          message: "Return date must be greater than or equal to mnf date.",
        });
      }
      // Create a new userModel document
      const data = new userModel({
        mnfDate: mnfDateObj,
        expDate: expDateObj,
        ...req.body,
      });
  
      await data.save();
      res.json({ success: true, message: "data saved successfully", data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: "An error occurred", error: error.message });
      console.log(error)
    }
  }
  );
  
  //update data 
  // http://localhost:8080/update
  
  router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      console.log(id);
      const data = await userModel.findByIdAndUpdate(id, rest, { new: true });
      if (!data) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
      return res.status(200).json({ success: true, message: "Data updated successfully", data: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  
  
  //delete api
  // http://localhost:8080/delete/id
  router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userModel.deleteOne({ _id: id });
      return res.status(200).json({ success: true, message: "Data deleted successfully", data: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  module.exports = router;