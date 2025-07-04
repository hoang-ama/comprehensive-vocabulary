# comprehensive-vocabulary
A comprehensive vocabulary mobile app using JavaScript (React Native/ Node.js)

## 📦 Vocabulary List Function
**Word:** E.g Concrete
* **Pronunciation (UK/US):** /ˈkɒŋkriːt/ (UK), /ˈkɑːŋkriːt/ (US)
* **Audio:** loundspeaker icon
* **Part of Speech:** (n)/(v)/(adj)
* **English Definition:**
* **Vietnamese Meaning:**
* **Synonyms:**
* **Antonyms:**
* **Common Phrases:**
* **Example Sentences:**

---

## 📱 Phase 1: Overview

**Tech Stack**

* **Frontend (Mobile App):** React Native (cross-platform)
* **Backend:** Node.js + Express
* **Database:** MongoDB (good for storing flexible word entries)
* **Optional:** Firebase Authentication (user accounts), Cloudinary (audio/images), or AWS S3/ Goole Cloud Server

---

## 🧱 Phase 2: Data Structure Design

Each vocabulary entry can be stored as a JSON document in MongoDB.

### Example Schema

```json
{
  "word": "concrete",
  "phonetics": {
    "uk": "/ˈkɒŋ.kriːt/",
    "us": "/ˈkɑːn.kriːt/"
  },
  "audio": {
    "uk": "https://.../concrete.mp3",
    "us": "https://.../concrete.mp3"
  },
  "partOfSpeech": ["noun", "adjective", "verb"],
  "definitions": {
    "noun": "A hard, strong building material...",
    "adjective": "Based on facts and information...",
    "verb": "To cover something in concrete..."
  },
  "vietnamese": {
    "noun": "bê tông",
    "adjective": "cụ thể, rõ ràng",
    "verb": "đổ bê tông"
  },
  "synonyms": ["specific", "definite"],
  "antonyms": ["abstract", "vague"],
  "collocations": [
    "concrete evidence",
    "concrete plan",
    "lay concrete"
  ],
  "examples": [
    "They poured concrete to build the foundation of the house.",
    "We need concrete proof before taking legal action."
  ]
}
```
---

## 🛠️ Phase 3: Backend API with Node.js + Express

### Key Endpoints

| Method | Route              | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/words`       | Get all words           |
| POST   | `/api/words`       | Add a new word          |
| GET    | `/api/words/:word` | Get details of one word |
| PUT    | `/api/words/:word` | Update word info        |
| DELETE | `/api/words/:word` | Delete a word           |

You’d also need:

* MongoDB connection (`mongoose`)
* CORS, body-parser
* Authentication (optional)

---

## 📲 Phase 4: React Native Frontend

### Main Screens

1. **Home** – Search bar + list of saved words
2. **Word Detail** – Shows phonetics, definitions, audio, examples, etc.
3. **Add/Edit Word** – Input form
4. **Settings** – Optional: language, sync, dark mode

### Key Features

* Play pronunciation audio (`expo-av`)
* Search or filter by part of speech
* Mark as favorite / studied
* Export to PDF or Quiz

---

## 💡 Phase 5: Optional Features

* **Cloud sync / login** (Firebase or JWT-based)
* **Spaced Repetition Review**
* **Flashcard generator**
* **AI integration**: Auto-suggest synonyms or create examples using OpenAI

---

## 📦 Directory Structure

```
/vocab-app
│
├── backend/
│   ├── server.js
│   ├── routes/wordRoutes.js
│   └── models/Word.js
│
├── frontend/
│   ├── App.js
│   ├── screens/
│   ├── components/
│   └── services/api.js
```

// File structure 
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

---

## 🚀 Get Started
