import { RequestHandler } from "express";
import { UserEvent } from "../entities/UserEvent";

export const createUserEvent: RequestHandler = async (req, res) => {
    try {
        const { id_user, id_event } = req.body;

        const _userEvent = new UserEvent();
        _userEvent.id_user = id_user;
        _userEvent.id_event = id_event;

        await _userEvent.save();

        res.status(201).json(_userEvent);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getUserEvents: RequestHandler = async (req, res) => {
    try {
        const _userEvent = await UserEvent.find();
        res.json(_userEvent);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateUserEvent: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _userEvent = await UserEvent.findOneBy({ id_user: parseInt(id) })

        if (!_userEvent) res.status(404).json({ message: "UserEvent not found" })

        await UserEvent.update({ id_user: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteUserEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await UserEvent.delete({ id_user: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "UserEvent not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getUserEvent: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _userEvent = await UserEvent.findBy({ id_user: parseInt(id) })

        if (!_userEvent) {
            res.status(404).json({ message: "UserEvent not found" })
        }

        res.json(_userEvent)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
