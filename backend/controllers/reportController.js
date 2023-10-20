const Report = require('../models/Report'); // Adjust the import path as needed

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { listing, reporter, reason } = req.body;

    const newReport = new Report({
      listing,
      reporter,
      reason,
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete report by ID
exports.deleteReportById = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.reportId);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
