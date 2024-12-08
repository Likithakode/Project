const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['available', 'inactive'], default: 'available' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

module.exports = mongoose.model('Test', testSchema);
