// File structure (you can copy this into your project folder):
// vocab-backend/
// ├── server.js
// ├── config/
// │   └── db.js
// ├── models/
// │   └── Word.js
// ├── routes/
// │   └── wordRoutes.js
// └── controllers/
//     └── wordController.js

// --- server.js ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const wordRoutes = require('./routes/wordRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/words', wordRoutes);

app.get('/', (req, res) => {
  res.send('Vocabulary API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// --- config/db.js ---
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;


// --- models/Word.js ---
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  phonetics: {
    uk: String,
    us: String,
  },
  audio: {
    uk: String,
    us: String,
  },
  partOfSpeech: [String],
  definitions: {
    noun: String,
    adjective: String,
    verb: String,
  },
  vietnamese: {
    noun: String,
    adjective: String,
    verb: String,
  },
  synonyms: [String],
  antonyms: [String],
  collocations: [String],
  examples: [String],
}, { timestamps: true });

module.exports = mongoose.model('Word', WordSchema);


// --- controllers/wordController.js ---
const Word = require('../models/Word');

exports.getWords = async (req, res) => {
  const words = await Word.find();
  res.json(words);
};

exports.getWord = async (req, res) => {
  const word = await Word.findOne({ word: req.params.word });
  if (word) res.json(word);
  else res.status(404).json({ message: 'Word not found' });
};

exports.addWord = async (req, res) => {
  try {
    const newWord = new Word(req.body);
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateWord = async (req, res) => {
  const word = await Word.findOneAndUpdate(
    { word: req.params.word },
    req.body,
    { new: true }
  );
  if (word) res.json(word);
  else res.status(404).json({ message: 'Word not found' });
};

exports.deleteWord = async (req, res) => {
  const word = await Word.findOneAndDelete({ word: req.params.word });
  if (word) res.json({ message: 'Deleted successfully' });
  else res.status(404).json({ message: 'Word not found' });
};


// --- routes/wordRoutes.js ---
const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/', wordController.getWords);
router.get('/:word', wordController.getWord);
router.post('/', wordController.addWord);
router.put('/:word', wordController.updateWord);
router.delete('/:word', wordController.deleteWord);

module.exports = router;
