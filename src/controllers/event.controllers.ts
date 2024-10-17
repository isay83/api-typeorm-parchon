import { RequestHandler } from "express";
import { Event } from "../entities/Event";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Place } from "../entities/Place";

export const createEvent: RequestHandler = async (req, res) => {
    try {
        const { id, event, description, date, time, image, capacity, rating, id_user, id_place, id_category } = req.body;

        const _event = new Event();

        const user = await User.findOneBy({ id: id_user });
        const place = await Place.findOneBy({ id: id_place });
        const category = await Category.findOneBy({ id: id_category });

        if (user) {
            _event.user = id_user;

        }

        if (place) {
            _event.place = id_place;
        }

        if (category) {
            _event.category = id_category;
        }

        _event.id = id;
        _event.event = event;
        _event.description = description;
        _event.date = date;
        _event.time = time;
        _event.image = image;
        _event.capacity = capacity;
        _event.rating = rating;

        await _event.save();

        res.status(201).json(_event);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getEvents: RequestHandler = async (req, res) => {
    try {
        const _event = await Event.find();
        res.json(_event);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _event = await Event.findOneBy({ id: parseInt(id) })

        if (!_event) res.status(404).json({ message: "Event not found" })

        await Event.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Event.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Event not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getEvent: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _event = await Event.findOneBy({ id: parseInt(id) })

        if (!_event) {
            res.status(404).json({ message: "Event not found" })
        }

        res.json(_event)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
