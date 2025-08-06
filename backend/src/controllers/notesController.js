import { noteModel } from "../models/NoteModel.js";

class NotesController {
    async getAllNotes (req, res) {
        try {
            const notes = await noteModel.find()
            return res.status(200).json({success : notes})
        } catch (error) {
            return res.status(500).json({error : "Server error"})
        }
    }
    async getNoteDetail (req, res) {
        const {id} = req.params;
        try {
            if (!id) {
                return res.status(404).json({error : 'Invalid note'})
            }
            const notes = await noteModel.findById(id)
            return res.status(200).json({success : notes})
        } catch (error) {
            return res.status(500).json({error : "Server error"})
        }
    }
    async createNote (req, res) {
        const {title, content} = req.body
        try {
            if (!title || !content) {
                return res.status(404).json({error : "Missing field required"})
            }
            const newNote = await noteModel.create({title, content})  
            return res.status(200).json({success : 'Create note successfully', newNote}) 
        } catch (error) {
            return res.status(500).json({error : "Server error"})
        }
    }
    async updateNote (req, res) {
        const {id} = req.params
        try {
            if (!id) {
                return res.status(404).json({error : 'Invalid note'})
            }
            const updateNote = await noteModel.updateOne({_id : id}, req.body)
            return res.status(200).json({success: 'Update note successfully', updateNote})
        } catch (error) {
            return res.status(500).json({error : "Server error"})
        }
    }
    async deleteNote (req, res) {
        const {id} = req.params
        try {
            if(!id) {
                return res.status(404).json({error : 'Invalid note'})
            }
            const deleteNote = await noteModel.findByIdAndDelete(id)
            return res.status(200).json({success : 'Delete note successfully', deleteNote})
        } catch (error) {
            return res.status(500).json({error : "Server error"})
        }
    }
}
export default new NotesController();