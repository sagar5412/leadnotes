import { Router, Request, Response } from "express";
import Note from "../models/Note";
import authMiddleware from "../middleware/auth";
import { sendNoteCreatedEmail } from "../services/email";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Missing title or content
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required" });
      return;
    }

    const note = new Note({
      title,
      content,
      userId: req.user!.uid,
      userEmail: req.user!.email,
    });

    await note.save();

    // Send email notification (non-blocking)
    sendNoteCreatedEmail({
      to: req.user!.email,
      noteTitle: title,
      noteContent: content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await Note.find({ userId: req.user!.uid }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      userId: req.user!.uid, // Ensure user can only delete their own notes
    });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
