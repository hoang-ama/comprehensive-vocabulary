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
const PORT = process.env.PORT || 4000;

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