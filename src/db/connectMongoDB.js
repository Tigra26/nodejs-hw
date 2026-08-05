import dns from 'node:dns';
import mongoose from 'mongoose';
import { Note } from '../models/note.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in the .env file');
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connection established successfully');

    await Note.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
