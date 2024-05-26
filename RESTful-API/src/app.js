const express = require("express");
const app = express();
const notes = require("./data/notes-data");

app.use(express.json());

app.get("/notes/:noteId", (req, res, next) => {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);

  if (foundNote) {
    res.json({ data: foundNote });
  } else {
    const error = new Error(`Note id not found: ${noteId}`);
    error.statue = 404;
    next(error);
  }
});


app.get("/notes", (req, res) => {
  res.json({ data: notes });
});

// TODO: Add ability to create a new note status:STARTED
// POST /notes to make new notes
app.post("/notes", (req, res, next) => {
  const { data } = req.body;

  if (!data || typeof data.text !== 'string' || data.text.trim() === "") {
    const error = new Error("Note text is required");
    error.status = 400;
    return next(error);
  }
  
  const newId = notes.length ? notes[notes.length - 1].id + 1 : 1;
  const newNote = { id: newId, text: data.text.trim() };

  notes.push(newNote);
  res.status(201).json({ data: newNote });
});

// TODO: Add not-found handler status:DONE
app.use((req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// TODO: Add error handler status:DONE
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
