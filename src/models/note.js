import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const handleMongooseError = (error, doc, next) => {
  error.status = 400;
  next(error);
};

const setMongooseUpdateRules = function () {
  this.setOptions({
    runValidators: true,
    returnDocument: 'after',
  });
};

noteSchema.index({ userId: 1, tag: 1 });

noteSchema.pre('findOneAndUpdate', setMongooseUpdateRules);

noteSchema.post('save', handleMongooseError);

noteSchema.post('findOneAndUpdate', handleMongooseError);

export const Note = model('Note', noteSchema);
