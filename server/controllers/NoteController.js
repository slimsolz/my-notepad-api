import Note from "../models/note";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import "babel-polyfill";

class NoteController {
  static async addNote(req, res, next) {
    try {
      const { content } = req.body;
      const newNote = new Note({ content });
      const response = await newNote.save();

      return successResponse(res, 201, "note saved successfully", response);
    } catch (error) {
      next(error);
    }
  }

  static async getAllNotes(req, res, next) {
    try {
      const { perPage, page } = req.query;
      const limit = parseInt(perPage, 10) || 2;
      const currentPage = parseInt(page, 10) || 1;
      const count = await Note.countDocuments();
      const notes = await Note.find()
        .limit(limit)
        .skip(limit * (currentPage - 1))
        .sort("-createdAt");

      return successResponse(res, 200, "notes retrieved successfully", {
        notes,
        perPage: limit,
        page: currentPage,
        totalPages: Math.ceil(count / limit),
        totalCount: count,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findById(id);

      if (!note) {
        return errorResponse(res, 404, "note not found");
      }

      return successResponse(res, 200, "note retrieved successfully", note);
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndDelete(id);

      if (!note) {
        return errorResponse(res, 404, "note not found");
      }

      return successResponse(res, 204);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAllNotes(req, res, next) {
    try {
      await Note.deleteMany({});
      return successResponse(res, 204);
    } catch (error) {
      next(error);
    }
  }

  static async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const note = await Note.findByIdAndUpdate(id, { content });
      if (!note) {
        return errorResponse(res, 404, "note not found");
      }

      return successResponse(res, 200, "note updated successfully", note);
    } catch (error) {
      next(error);
    }
  }
}

export default NoteController;
