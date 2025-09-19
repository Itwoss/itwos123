// server/routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { service, date, details } = req.body;
    
    // Get user's name for the booking
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const newBooking = new Booking({
      user: req.user.userId,
      userName: user.name,
      service,
      date,
      details
    });
    
    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings for the current user
router.get('/user', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (admin only)
router.get('/all', [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user or if the user is an admin
    if (booking.user.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await booking.remove();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
