import { RequestHandler } from "express";
import { TicketUser } from "../entities/TicketUser";

export const createTicketUser: RequestHandler = async (req, res) => {
    try {
        const { id_user, id_event, id_ticket, quantity } = req.body;

        const _ticketUser = new TicketUser();
        _ticketUser.id_user = id_user;
        _ticketUser.id_event = id_event;
        _ticketUser.id_ticket = id_ticket;
        _ticketUser.quantity = quantity;

        await _ticketUser.save();

        res.status(201).json(_ticketUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTicketUsers: RequestHandler = async (req, res) => {
    try {
        const _ticketUser = await TicketUser.find();
        res.json(_ticketUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateTicketUser: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _ticketUser = await TicketUser.findOneBy({ id_user: parseInt(id) })

        if (!_ticketUser) res.status(404).json({ message: "TicketUser not found" })

        await TicketUser.update({ id_user: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteTicketUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await TicketUser.delete({ id_user: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "TicketUser not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTicketUser: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _ticketUser = await TicketUser.findBy({ id_user: parseInt(id) })

        if (!_ticketUser) {
            res.status(404).json({ message: "TicketUser not found" })
        }

        res.json(_ticketUser)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
