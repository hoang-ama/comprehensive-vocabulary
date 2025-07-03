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
