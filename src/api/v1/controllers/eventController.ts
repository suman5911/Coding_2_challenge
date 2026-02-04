import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";

// Get all events
export const getAllEvents = (req: Request, res: Response): void => {
  const events = eventService.getAllEvents();
  res.status(HTTP_STATUS.OK).json({
    message: "Events retrieved",
    count: events.length,
    data: events,
  });
};

// Get a single event by ID
export const getEventById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const event = eventService.getEventById(id);

  if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Event not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Event retrieved",
    data: event,
  });
};

// Get popularity details for an event
export const getEventPopularity = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const popularity = eventService.getEventPopularity(id);

  if (!popularity) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Event not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Event popularity calculated",
    data: popularity,
  });
};

// Create a new event
export const createEvent = (req: Request, res: Response): void => {
  const { name, date, capacity } = req.body;

  if (!name) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: name",
    });
    return;
  }

  if (!date) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: date",
    });
    return;
  }

  if (!capacity) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: capacity",
    });
    return;
  }

  const newEvent = eventService.createEvent({ name, date, capacity });
  res.status(HTTP_STATUS.CREATED).json({
    message: "Event created",
    data: newEvent,
  });
};

// update an existing event
export const updateEvent = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const { name, date, capacity } = req.body;

  if (!id) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: id",
    });
    return;
  }

  const updatedEvent = eventService.updateEvent(id, { name, date, capacity });

  if (!updatedEvent) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Event not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Event updated",
    data: updatedEvent,
  });
};

// Delete an event by ID 
export const deleteEvent = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const deleted = eventService.deleteEvent(id);

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Event not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: "Event deleted",
  });
};