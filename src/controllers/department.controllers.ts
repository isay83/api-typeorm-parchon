import { RequestHandler } from "express";
import { Department } from "../entities/Department";

export const createDepartment: RequestHandler = async (req, res) => {
    try {
        const { id, department } = req.body;

        const _department = new Department();
        _department.id = id;
        _department.department = department;

        await _department.save();

        res.json(_department);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getDepartments: RequestHandler = async (req, res) => {
    try {
        const _department = await Department.find();
        res.json(_department);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const updateDepartment: RequestHandler = async (req, res) => {
    const { id } = req.params

    try {
        const _department = await Department.findOneBy({ id: parseInt(id) })

        if (!_department) res.status(404).json({ message: "Department not found" })

        await Department.update({ id: parseInt(id) }, req.body)

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const deleteDepartment: RequestHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Department.delete({ id: parseInt(id) })

        if (result.affected === 0) {
            res.status(404).json({ message: "Department not found" })
        }

        res.sendStatus(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};

export const getDepartment: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params

        const _department = await Department.findOneBy({ id: parseInt(id) })

        if (!_department) {
            res.status(404).json({ message: "Department not found" })
        }

        res.json(_department)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        res.status(500).json({ message: "Unknown error occurred" });
    }
};
