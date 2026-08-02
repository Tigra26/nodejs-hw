import { Router } from 'express';
import {
  notes,
  getNotes,
  getNoteById,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', notes);

router.get('/notes', getNotes);

router.get('/notes/:noteId', getNoteById);

export default router;
