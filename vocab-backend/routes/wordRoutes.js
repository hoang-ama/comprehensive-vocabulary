

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
