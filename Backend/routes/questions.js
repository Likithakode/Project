const express = require('express');
const Question = require('../models/question');
const { protectUser, protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Submit a new question by user
// @route   POST /api/questions/submit
router.post('/submit', protectUser, async (req, res) => {
  try {
    const { title, description, difficulty, category, points, detailedDescription, examples, constraints, testId } = req.body;

    // Create new question
    const newQuestion = await Question.create({
      title,
      description,
      difficulty,
      category,
      points,
      detailedDescription,
      examples,
      constraints,
      testId,
      submittedBy: req.user._id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting question', error: error.message });
  }
});

// @desc    Get all questions
// @route   GET /api/questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('submittedBy', 'username')
      .populate('category', 'name') // Populate category field (Topic reference)
      .populate('testId', 'title') // Populate testId field (Test reference)
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

// @desc    Get a question by ID
// @route   GET /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('submittedBy', 'username')
      .populate('category', 'name')
      .populate('testId', 'title');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
});

// @desc    Add question by admin
// @route   POST /api/questions/admin/add
router.post('/admin/add', protectAdmin, async (req, res) => {
  try {
    const { title, description, difficulty, category, points, detailedDescription, examples, constraints, testId } = req.body;

    const newQuestion = await Question.create({
      title,
      description,
      difficulty,
      category,
      points,
      detailedDescription,
      examples,
      constraints,
      testId
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error adding question by admin', error: error.message });
  }
});

// @desc    Update a question
// @route   PUT /api/questions/:id
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { title, description, difficulty, category, points, detailedDescription, examples, constraints, testId } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { title, description, difficulty, category, points, detailedDescription, examples, constraints, testId },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
});

// @desc    Delete a question
// @route   DELETE /api/questions/:id
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
});

module.exports = router;
