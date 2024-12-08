const express = require('express');
const Test = require('../models/test');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Create a new test
// @route   POST /api/tests/create
router.post('/create', protectAdmin, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Create a new test
    const newTest = await Test.create({
      title,
      description,
      difficulty,
      points,
      detailedDescription,
      examples,
      constraints
    });

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error: error.message });
  }
});

// @desc    Get all tests
// @route   GET /api/tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find()
      .populate('questions') // Populate questions if needed
      .sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests', error: error.message });
  }
});

// @desc    Get a test by ID
// @route   GET /api/tests/:id
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions');
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error: error.message });
  }
});

// @desc    Update a test
// @route   PUT /api/tests/:id
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating test', error: error.message });
  }
});

// @desc    Delete a test
// @route   DELETE /api/tests/:id
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting test', error: error.message });
  }
});

module.exports = router;
