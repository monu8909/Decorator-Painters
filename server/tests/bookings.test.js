const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bookingsRouter = require('../routes/bookings');

// Mock environment variables
process.env.ADMIN_TOKEN = 'test-admin-token';
process.env.BOOKINGS_FILE = './test-bookings.json';
process.env.UPLOAD_DIR = './test-uploads';

// Create test app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/bookings', bookingsRouter);

// Cleanup function
function cleanup() {
  const testBookingsFile = process.env.BOOKINGS_FILE;
  if (fs.existsSync(testBookingsFile)) {
    fs.unlinkSync(testBookingsFile);
  }
}

describe('Bookings API', () => {
  beforeEach(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking with valid data', async () => {
      const bookingData = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        address: '123 Main St',
        numberOfRooms: '3',
        preferredStartDate: '2024-06-01',
        budgetRange: '5000-10000'
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.bookingId).toBeDefined();
    });

    it('should reject booking with missing required fields', async () => {
      const bookingData = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing phone and address
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(400);

      expect(response.body.error).toContain('Missing required fields');
    });

    it('should reject booking with invalid email', async () => {
      const bookingData = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'invalid-email',
        address: '123 Main St'
      };

      const response = await request(app)
        .post('/api/bookings')
        .send(bookingData)
        .expect(400);

      expect(response.body.error).toContain('Invalid email format');
    });
  });

  describe('GET /api/bookings', () => {
    it('should return 401 without admin token', async () => {
      const response = await request(app)
        .get('/api/bookings')
        .expect(401);

      expect(response.body.error).toContain('Unauthorized');
    });

    it('should return bookings with valid admin token', async () => {
      // First create a booking
      const bookingData = {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john@example.com',
        address: '123 Main St'
      };

      await request(app)
        .post('/api/bookings')
        .send(bookingData);

      // Then fetch bookings with admin token
      const response = await request(app)
        .get('/api/bookings')
        .set('x-admin-token', 'test-admin-token')
        .expect(200);

      expect(response.body.bookings).toBeInstanceOf(Array);
      expect(response.body.bookings.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('should return a specific booking with valid admin token', async () => {
      // Create a booking
      const bookingData = {
        name: 'Jane Doe',
        phone: '+1234567890',
        email: 'jane@example.com',
        address: '456 Oak Ave'
      };

      const createResponse = await request(app)
        .post('/api/bookings')
        .send(bookingData);

      const bookingId = createResponse.body.bookingId;

      // Fetch the specific booking
      const response = await request(app)
        .get(`/api/bookings/${bookingId}`)
        .set('x-admin-token', 'test-admin-token')
        .expect(200);

      expect(response.body.booking).toBeDefined();
      expect(response.body.booking.id).toBe(bookingId);
      expect(response.body.booking.name).toBe('Jane Doe');
    });

    it('should return 404 for non-existent booking', async () => {
      const response = await request(app)
        .get('/api/bookings/non-existent-id')
        .set('x-admin-token', 'test-admin-token')
        .expect(404);

      expect(response.body.error).toContain('not found');
    });
  });
});

