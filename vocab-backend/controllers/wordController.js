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
