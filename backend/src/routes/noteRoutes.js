import express from 'express'
import notesController from '../controllers/notesController.js'
export const NoteRoute = express.Router()
NoteRoute.get('/', notesController.getAllNotes)
NoteRoute.get('/:id', notesController.getNoteDetail)
NoteRoute.post('/create', notesController.createNote)
NoteRoute.put("/:id", notesController.updateNote)
NoteRoute.delete("/:id", notesController.deleteNote)