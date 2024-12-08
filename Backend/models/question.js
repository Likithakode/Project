const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  points: { type: Number, required: true },
  detailedDescription: { type: String, required: true },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: { type: String, required: true },
    }
  ],
  constraints: [{ type: String }],
});

module.exports = mongoose.model('Question', questionSchema);
