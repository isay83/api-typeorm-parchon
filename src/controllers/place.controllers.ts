import { RequestHandler } from "express";
import { Place } from "../entities/Place";

export const createPlace: RequestHandler = async (req, res) => {
    try {
        const { id, place } = req.body;

        const _place = new Place();
        _place.id = id;
        _place.place = place;

        await _place.save();

        res.status(201).json(_place);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getPlaces: RequestHandler = async (req, res) => {
    try {
        const _place = await Place.find();
        res.json(_place);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updatePlace: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _place = await Place.findOneBy({ id: parseInt(id) })

        if (!_place) res.status(404).json({ message: "Place not found" })

        await Place.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deletePlace: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Place.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Place not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getPlace: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _place = await Place.findOneBy({ id: parseInt(id) })

        if (!_place) {
            res.status(404).json({ message: "Place not found" })
        }

        res.json(_place)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
