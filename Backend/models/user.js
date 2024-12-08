const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attempted_tests: [
    {
      testId: { type: Schema.Types.ObjectId, ref: 'Test' },
      score: {
        type: Map,
        of: Number,
        required: true,  // Store score for each question (questionId: score)
      }
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
