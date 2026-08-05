import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),

    perPage: Joi.number().integer().min(5).max(20).default(10),

    tag: Joi.string().valid(...TAGS),

    search: Joi.string().allow('').default(''),

    sortBy: Joi.string().valid('_id', 'tag').default('_id'),

    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required().messages({
      'any.required': 'Title is required',
      'string.base': 'Title must be a string',
      'string.min': 'Title must contain at least {#limit} character',
    }),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
