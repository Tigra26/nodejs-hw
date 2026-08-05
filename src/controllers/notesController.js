import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search = '',
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;
  const skip = (page - 1) * perPage;

  const myQuery = Note.find();
  if (tag) {
    myQuery.where('tag').equals(tag);
  }
  if (search) {
    myQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalNotes, notes] = await Promise.all([
    myQuery.clone().countDocuments(),
    myQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);
  const totalPages = Math.ceil(totalNotes / perPage);
  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, `Cannot find note with id=${noteId}`);
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!deleteNote) {
    throw createHttpError(404, `Cannot find note with id=${noteId}`);
  }

  res.status(200).json(deleteNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const updateNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!updateNote) {
    throw createHttpError(404, `Cannot find note with id=${noteId}`);
  }

  res.status(200).json(updateNote);
};
