import { RequestHandler } from "express";
import { Tier } from "../entities/Tier";

export const createTier: RequestHandler = async (req, res) => {
    try {
        const { id, tier, description } = req.body;

        const _tier = new Tier();
        _tier.id = id;
        _tier.tier = tier;
        _tier.description = description;

        await _tier.save();

        res.status(201).json(_tier);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTiers: RequestHandler = async (req, res) => {
    try {
        const _tier = await Tier.find();
        res.json(_tier);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateTier: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _tier = await Tier.findOneBy({ id: parseInt(id) })

        if (!_tier) res.status(404).json({ message: "Tier not found" })

        await Tier.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteTier: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Tier.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Tier not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getTier: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _tier = await Tier.findOneBy({ id: parseInt(id) })

        if (!_tier) {
            res.status(404).json({ message: "Tier not found" })
        }

        res.json(_tier)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
