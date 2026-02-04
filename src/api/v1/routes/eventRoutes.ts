import express, { Router } from "express";
import {
  
  getEventById,
  createEvent,
  getAllEvents,
  deleteEvent,
  getEventPopularity,
  updateEvent,
} from "../controllers/eventController";

const router: Router = express.Router(); // Router for event API endpoints

router.get("/events/:id", getEventById);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.get("/events", getAllEvents); // Get all events
router.delete("/events/:id", deleteEvent); // Delete an event by ID
router.get("/events/:id/popularity", getEventPopularity);

export default router;