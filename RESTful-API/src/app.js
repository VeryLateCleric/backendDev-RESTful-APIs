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

// TODO: Add ability to create a new note


// TODO: Add not-found handler
app.use((req, res, next) => {
  const error = new Error(`Not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// TODO: Add error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
