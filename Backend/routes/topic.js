const express = require('express');
const Topic = require('../models/topic');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Create a new topic
// @route   POST /api/topics/create
router.post('/create', protectAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    const newTopic = await Topic.create({
      name,
      description
    });

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic', error: error.message });
  }
});

// @desc    Get all topics
// @route   GET /api/topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error: error.message });
  }
});

// @desc    Get a topic by ID
// @route   GET /api/topics/:id
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic', error: error.message });
  }
});

module.exports = router;
