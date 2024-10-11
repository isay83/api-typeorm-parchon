import { RequestHandler } from "express";
import { Ticket } from "../entities/Ticket";

export const createTicket: RequestHandler = async (req, res) => {
    try {
        const { id_event, id, price, remaining, id_tier } = req.body;

        const _ticket = new Ticket();
        _ticket.id_event = id_event;
        _ticket.id = id;
        _ticket.price = price;
        _ticket.remaining = remaining;
        _ticket.id_tier = id_tier;

        await _ticket.save();

        res.status(201).json(_ticket);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTickets: RequestHandler = async (req, res) => {
    try {
        const _ticket = await Ticket.find();
        res.json(_ticket);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateTicket: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _ticket = await Ticket.findOneBy({ id: parseInt(id) })

        if (!_ticket) res.status(404).json({ message: "Ticket not found" })

        await Ticket.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteTicket: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Ticket.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Ticket not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTicket: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _ticket = await Ticket.findOneBy({ id: parseInt(id) })

        if (!_ticket) {
            res.status(404).json({ message: "Ticket not found" })
        }

        res.json(_ticket)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
