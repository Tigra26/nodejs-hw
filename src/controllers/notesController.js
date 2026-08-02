import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const notes = async (req, res) => {
  res.status(200).json({
    message: 'Server is running',
  });
};

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, `Cannot find note with id=${noteId}`);
  }

  res.status(200).json(note);
};
