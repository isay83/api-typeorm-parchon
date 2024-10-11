import { RequestHandler } from "express";
import { Role } from "../entities/Role";

export const createRole: RequestHandler = async (req, res) => {
    try {
        const { id, role } = req.body;

        const _role = new Role();
        _role.id = id;
        _role.role = role;

        await _role.save();

        res.status(201).json(_role);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getRoles: RequestHandler = async (req, res) => {
    try {
        const _role = await Role.find();
        res.json(_role);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateRole: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _role = await Role.findOneBy({ id: parseInt(id) })

        if (!_role) res.status(404).json({ message: "Role not found" })

        await Role.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteRole: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Role.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Role not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getRole: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _role = await Role.findOneBy({ id: parseInt(id) })

        if (!_role) {
            res.status(404).json({ message: "Role not found" })
        }

        res.json(_role)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
