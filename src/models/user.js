import { Schema, model } from 'mongoose';

const handleMongooseError = (err, doc, next) => {
  err.code === 11000 ? (err.status = 409) : (err.status = 400);
  next(err);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.post('save', handleMongooseError);

export const User = model('User', userSchema);
