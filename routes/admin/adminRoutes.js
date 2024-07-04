
const express = require('express');
const router = express.Router();
const Admin = require('../../models/admin/adminModel'); 

// Route to create a new admin
router.post('/', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
