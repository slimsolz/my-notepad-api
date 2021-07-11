import express from "express";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import NoteController from "../controllers/NoteController";
import {
  createNoteValidator,
  validateParam,
} from "../middlewares/noteValidation";

const router = express.Router();

router.get("/", (req, res) => {
  successResponse(res, 200, "Welcome to my-notepad API");
});

router.post("/notes", createNoteValidator, NoteController.addNote);
router.get("/notes", NoteController.getAllNotes);
router.get("/notes/:id", validateParam, NoteController.getNote);
router.patch("/notes/:id", validateParam, NoteController.updateNote);
router.delete("/notes/:id", validateParam, NoteController.deleteNote);
router.delete("/notes", NoteController.deleteAllNotes);

router.all("*", (req, res) => {
  errorResponse(res, 404, "404 route not found.");
});

export default router;
