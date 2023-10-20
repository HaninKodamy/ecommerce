const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

// Create a new report
router.post('/reports', reportController.createReport);

// Get all reports
router.get('/reports', reportController.getAllReports);

// Get report by ID
router.get('/reports/:reportId', reportController.getReportById);

// Delete report by ID
router.delete('/reports/:reportId', reportController.deleteReportById);

module.exports = router;
