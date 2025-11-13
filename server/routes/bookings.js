const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || './uploads';
const bookingsFile = process.env.BOOKINGS_FILE || './data/bookings.json';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-token';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to read bookings from file
function readBookings() {
  try {
    if (fs.existsSync(bookingsFile)) {
      const data = fs.readFileSync(bookingsFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

// Helper function to write bookings to file
function writeBookings(bookings) {
  try {
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing bookings:', error);
    return false;
  }
}

// Middleware to verify admin token
function verifyAdminToken(req, res, next) {
  const token = req.headers['x-admin-token'];
  
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized. Invalid admin token.' });
  }
  
  next();
}

// POST /api/bookings - Create a new booking
router.post('/', upload.array('photos', 10), (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      numberOfRooms,
      preferredStartDate,
      budgetRange
    } = req.body;

    // Validation
    if (!name || !phone || !email || !address) {
      return res.status(400).json({ error: 'Missing required fields: name, phone, email, address' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const booking = {
      id: uuidv4(),
      name,
      phone,
      email,
      address,
      numberOfRooms: parseInt(numberOfRooms) || 0,
      preferredStartDate: preferredStartDate || null,
      budgetRange: budgetRange || null,
      photos: req.files ? req.files.map(file => `/uploads/${file.filename}`) : [],
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const bookings = readBookings();
    bookings.push(booking);
    writeBookings(bookings);

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/bookings - Get all bookings (admin only)
router.get('/', verifyAdminToken, (req, res) => {
  try {
    const bookings = readBookings();
    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/bookings/:id - Get a specific booking (admin only)
router.get('/:id', verifyAdminToken, (req, res) => {
  try {
    const bookings = readBookings();
    const booking = bookings.find(b => b.id === req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

